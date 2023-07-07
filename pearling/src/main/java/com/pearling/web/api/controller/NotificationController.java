package com.pearling.web.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public SseEmitter subscribe(@PathVariable Integer subMemberId) {
        return notificationService.subscribe(subMemberId);
    } // 클라이언트에서 구독을 하기 위한 subscribe 메서드, 클라이언트가 서버로부터 알림을 수신할 수 있다.

    // @PostMapping("/send-data/{id}")
    // public void sendData(@PathVariable Integer id) {
    //     notificationService.notify(id, "data");
    // } // 임시로 서버에서 클라이언트로 알림을 주기 위한 sendData 메서드

	@PostMapping("/notify/{subMemberId}")
	public void notify(@PathVariable Integer subMemberId, @RequestBody Notification notification) {
		notificationService.notify(subMemberId, notification);
	}
}