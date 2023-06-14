package com.pearling.web.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.pearling.web.entity.Member;
import com.pearling.web.service.MemberService;

@Controller
public class MemberController extends BaseController {

    @Autowired
    MemberService service;

    @GetMapping("/icn/aside")
    public String getUser(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Member member = service.getByEmail(email);
        model.addAttribute("member", member);
        return "inc/aside";
    }
}