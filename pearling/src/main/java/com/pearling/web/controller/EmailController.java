package com.pearling.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pearling.web.service.MailService;

@Controller // 컨트롤러임을 명시
public class EmailController {
    @Autowired
    private MailService mailservice;

    // 이메일 인증
    @PostMapping("/signup/mailConfirm") // 경로 수정
    @ResponseBody
    String mailConfirm(@RequestParam("email") String email) throws Exception {
        String code = mailservice.sendSimpleMessage(email);
        System.out.println("인증코드 : " + code);
        return code;
    }
}