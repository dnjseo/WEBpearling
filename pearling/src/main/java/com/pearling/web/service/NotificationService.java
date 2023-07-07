package com.pearling.web.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.pearling.web.entity.Notification;
import com.pearling.web.repository.EmitterRepository;
import com.pearling.web.repository.MemberRepository;
import com.pearling.web.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {
    // 기본 타임아웃 설정
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    @Autowired
    private EmitterRepository emitterRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private MemberRepository memberRepository;

    /**
     * 클라이언트가 구독을 위해 호출하는 메서드.
     *
     * @param userId - 구독하는 클라이언트의 사용자 아이디.
     * @return SseEmitter - 서버에서 보낸 이벤트 Emitter
     */
    public SseEmitter subscribe(Integer userId) {
        SseEmitter emitter = createEmitter(userId); // emitter 생성
		
        // sendToClient(userId, "EventStream Created. [userId=" + userId + "]");
		System.out.println("emitter가 여기있어요." + emitter.toString());
		System.out.println(emitterRepository.getAllEmitters());
		return emitter;
    }

	    /**
     * 클라이언트에게 데이터를 전송
     *
     * @param userId   - 데이터를 받을 사용자의 아이디.
     * @param data - 전송할 데이터.
     */
    // private void sendToClient(Integer userId, Object data) {
    //     SseEmitter emitter = emitterRepository.get(userId);
    //     if (emitter != null) {
    //         try {
    //             String eventData = new String(data.toString().getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1);
    //             emitter.send(SseEmitter.event().id(String.valueOf(userId)).name("sse").data(eventData));
    //         } catch (IOException exception) {
    //             emitterRepository.deleteById(userId);
    //             emitter.completeWithError(exception);
    //         }
    //     }
    // }

	private void sendToClient(Integer userId, String message) {
		SseEmitter emitter = emitterRepository.get(userId);
		if (emitter != null) {
			try {
				String eventData = new String(message.getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1);
				emitter.send(SseEmitter.event().id(String.valueOf(userId)).name("sse").data(eventData));
			} catch (IOException exception) {
				emitterRepository.deleteById(userId);
				emitter.completeWithError(exception);
			}
		}
	}

	/**
     * 사용자 아이디를 기반으로 이벤트 Emitter를 생성
     *
     * @param userId - 사용자 아이디.
     * @return SseEmitter - 생성된 이벤트 Emitter.
     */
    private SseEmitter createEmitter(Integer userId) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        emitterRepository.save(userId, emitter);
        // Emitter가 완료될 때(모든 데이터가 성공적으로 전송된 상태) Emitter를 삭제한다.
        emitter.onCompletion(() -> emitterRepository.deleteById(userId));
        // Emitter가 타임아웃 되었을 때(지정된 시간동안 어떠한 이벤트도 전송되지 않았을 때) Emitter를 삭제한다.
        emitter.onTimeout(() -> emitterRepository.deleteById(userId));

        return emitter;
    }

    /**
     * 서버의 이벤트를 클라이언트에게 보내는 메서드
     * 다른 서비스 로직에서 이 메서드를 사용해 데이터를 Object event에 넣고 전송하면 된다.
     *
     * @param userId - 메세지를 전송할 사용자의 아이디.
     * @param event  - 전송할 이벤트 객체.
     */
    public void notify(Integer subMemberId, Notification notification) {
        // 알림 저장
        notificationRepository.save(notification);
        // 알림 수신자에게 알림 전송
        sendNotificationToClient(subMemberId, notification.getMessage());
		System.out.println(notification.getMessage());
    }

    private void sendNotificationToClient(Integer subMemberId, String message) {
        SseEmitter emitter = emitterRepository.get(subMemberId); // 수신자 아이디
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event().name("sse").data(message));
				System.out.println("emitter 등록 시" + emitter);
            } catch (IOException e) {
                // 에러 처리 로직 추가
            }
        }
    }
	
	public List<Notification> getNotificationsByUserId(Integer userId) {
        // 사용자 아이디에 해당하는 알림 목록을 조회하여 반환합니다.
        return notificationRepository.findByUserId(userId);
    }
}
