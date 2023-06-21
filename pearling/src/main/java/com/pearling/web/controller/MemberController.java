package com.pearling.web.controller;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

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
                                Model model) {
        Member existingMember = service.getByUsername(user.getUsername());

        if (existingMember != null) {
            existingMember.setName(member.getName());
            existingMember.setNickname(member.getNickname());

            try {
                // 이미지가 존재하는 경우에만 업로드 처리를 수행합니다.
                String profileImagePath = service.uploadProfileImage(file); // 프로필 이미지 업로드 및 경로 설정
                System.out.println("너 존재하니 ????/");
                if (profileImagePath != null) {
                    existingMember.setProfileImage(profileImagePath);
                }
                System.out.println(profileImagePath);

                int result = service.updateMember(existingMember);

                if (result != 0) {
                    user.setName(member.getName());
                    user.setNickname(member.getNickname());
                    user.setProfileImage(member.getProfileImage());
                }

                // 수정된 member 객체를 다시 모델에 추가합니다.
                model.addAttribute("member", existingMember);

                return "redirect:/setting/profile";
            } catch (IOException e) {
                // 파일 업로드 오류 처리
                e.printStackTrace();
                System.out.println("못찾겠다... 하");
                // 여기서 오류 처리 로직을 추가해주세요.
            }
        }

        return "redirect:/setting/profile"; // 회원이 존재하지 않을 경우 메인 페이지로 리다이렉트
    }

 

}