package com.pearling.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.pearling.web.entity.Member;
import com.pearling.web.service.MemberService;

@Controller
public class MemberController {

    @Autowired
    private MemberService service;

    @GetMapping("/signup")
    public String signupForm(Model model){
        model.addAttribute("member", new Member());
        return "signup";
    }

    @PostMapping("signup")
    public String signupSubmit(@ModelAttribute Member member){
        service.registerMember(member);
        return "redirect:/login";
    }

    @GetMapping("/profile")
    public String profileForm(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Member member = service.getByUsername(username);
        model.addAttribute("member", member);
        return "profile";
    }

    @PostMapping("/profile")
    public String profileSubmit(@ModelAttribute Member member) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Member existingMember = service.getByUsername(username);

        if (existingMember != null) {
            existingMember.setName(member.getName());
            existingMember.setNickname(member.getNickname());

            service.updateMember(existingMember); // 회원 정보 업데이트
        } else {
            throw new RuntimeException("Member not found with username: " + username);
        }

        return "redirect:/profile";
    }

}