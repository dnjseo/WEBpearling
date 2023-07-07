package com.pearling.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pearling.web.entity.Notification;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.NotificationService;

@Controller
@RequestMapping("/notification")
public class NotificationController {

	@Autowired
	private NotificationService notificationService;

    @GetMapping("/list")
    public String showNotificationList(Model model, 
	@AuthenticationPrincipal MyUserDetails user) {
        Integer userId = user.getId();
        List<Notification> notifications = notificationService.getNotificationsByUserId(userId);
        model.addAttribute("notifications", notifications);
        return "notification/list"; // 화면을 표시하는 템플릿의 경로
    }

}
