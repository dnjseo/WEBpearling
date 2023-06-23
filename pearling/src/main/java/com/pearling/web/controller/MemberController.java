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
        System.out.println("ggggggggg 반갑습니다----------------------");
        return "setting/profile";
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

            // System.out.println("ddddddddddddddddddddddddd" + existingMember.setName(member.getName()));

            String fileName = null;

            if (!file.isEmpty()) {
                // 파일 업로드를 MemberService를 통해 처리
                fileName = service.uploadProfileImage(file, request);
                existingMember.setProfileImage(fileName);
                System.out.println("나 업로드 중이다아앙!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            }

            // 서비스 계층의 업데이트 코드를 제거하였으므로 해당 부분을 수정해야합니다.
            int result = service.updateMember(existingMember);

            if (result != 0) {
                user.setName(member.getName());
                user.setNickname(member.getNickname());
                user.setProfileImage(fileName);
            }

            // 수정된 member 객체를 다시 모델에 추가합니다.
            model.addAttribute("member", existingMember);

            // 다른 작업이나 리디렉션을 처리하기 위해 코드를 수정합니다.

            return "redirect:/setting/profile";
        }
        return "redirect:/setting/profile";
    }
}