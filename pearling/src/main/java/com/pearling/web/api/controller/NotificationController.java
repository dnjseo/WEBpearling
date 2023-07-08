package com.pearling.web.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.pearling.web.entity.Notification;
import com.pearling.web.service.NotificationService;

@RestController("apiNotificationController")
@RequestMapping("api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping(value = "/sub/{subMemberId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@PathVariable Integer subMemberId,
            @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        return notificationService.subscribe(subMemberId);
    } // 클라이언트에서 구독을 하기 위한 subscribe 메서드, 클라이언트가 서버로부터 알림을 수신할 수 있다.
      // lastEventId는 마지막으로 수신한 데이터의 id를 의미한다. 이를 이용하여 유실된 데이터 재전송 가능.

    @PostMapping("/notify/{subMemberId}")
    public void notify(@PathVariable Integer subMemberId, @RequestBody Notification notification) {
        notificationService.notify(subMemberId, notification);
    }

    @GetMapping("{userId}")
    public List<Notification> Readlist(@PathVariable Integer userId) {

        List<Notification> notification = null;
        notification = notificationService.getNotificationsByUserIdAndIsRead(userId);

        return notification;
    }

    @GetMapping("list/{userId}")
    public List<Notification> list(@PathVariable Integer userId) {

        List<Notification> notification = null;
        notification = notificationService.getNotificationsByUserId(userId);

        return notification;
    }

    @PutMapping("{id}")
	public void update(@PathVariable("id") Integer id,
                        @RequestBody Notification notification) {

        notificationService.update(notification);
		System.out.println("나는 notification-put 레스트컨트롤러" + notification);

	}

    @DeleteMapping("{notiId}")
    public void delete(@PathVariable("notiId") Integer notiId) {

        notificationService.delete(notiId);

        System.out.println("나는 notification-delete 레스트컨트롤러");
    }

}