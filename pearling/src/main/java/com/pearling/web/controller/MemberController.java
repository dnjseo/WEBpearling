package com.pearling.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.pearling.web.entity.Member;
import com.pearling.web.security.MyUserDetails;
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
    public String profileForm(Model model,
        @AuthenticationPrincipal MyUserDetails user) {
        Member pmember = service.getByUsername(user.getUsername());
        model.addAttribute("pmember", pmember);
        System.out.println("이걸 봐봐라라아아아아아아아앙앙아아아아" + pmember);
        
        return "setting/profile";
    }

    @PostMapping("/profile")
    public String profileSubmit(@ModelAttribute Member member,
                @AuthenticationPrincipal MyUserDetails user, Model model) {

        Member existingMember = service.getByUsername(user.getUsername());

        if (existingMember != null) {
            existingMember.setName(member.getName());
            existingMember.setNickname(member.getNickname());
            service.updateMember(existingMember);

            // 수정된 pmember 객체를 다시 모델에 추가합니다.
            model.addAttribute("pmember", existingMember);
        } else {
            throw new RuntimeException("Member not found with username: " + user.getUsername());
        }

        return "redirect:/profile";
    }


}