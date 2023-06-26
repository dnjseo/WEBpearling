package com.pearling.web.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.pearling.web.entity.Member;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class MemberController {

    @Autowired
    private MemberService service;

    @GetMapping("/signup")
    public String signupForm(Model model){
        model.addAttribute("member", new Member());
        return "signup";
    }

    @PostMapping("/profile")
    public String profileSubmit(@ModelAttribute Member member,
                                @AuthenticationPrincipal MyUserDetails user,
                                @RequestParam("file") MultipartFile file,
                                HttpServletRequest request,
                                Model model) throws IOException {
        Member existingMember = service.getByUsername(user.getUsername());

        if (existingMember != null) {
            existingMember.setName(member.getName());
            existingMember.setNickname(member.getNickname());

            String fileName = existingMember.getProfileImage(); // 기존 파일명 유지

            if (!file.isEmpty()) {
                // 파일이 비어있지 않은 경우에만 파일 업로드 수행
                fileName = service.uploadProfileImage(file, request);
                existingMember.setProfileImage(fileName);
            }

            int result = service.updateMember(existingMember);

            if (result != 0) {
                user.setName(member.getName());
                user.setNickname(member.getNickname());
                user.setProfileImage(fileName);
            }

            model.addAttribute("member", existingMember);

            return "redirect:/setting/profile";
        }

        return "redirect:/setting/profile";
    }

}