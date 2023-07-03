package com.pearling.web.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.entity.Member;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.MemberService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController("apiMemberController")
@RequestMapping("api/member")
public class MemberController {

    @Autowired
    private MemberService service;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 회원가입
    @PostMapping(consumes = "application/json", produces = "application/json")
    public void post(@RequestBody Member member) {

        // 비밀번호 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPwd());
        member.setPwd(encryptedPassword);

        service.add(member);
        System.out.println("회원가입 컨트롤러입니다 !");
    }

    // 이메일 중복 검사
    @PostMapping("/check-email")
    public boolean checkEmailExists(@RequestParam("email") String email) {
        return service.checkEmailExists(email);
    }

    // 닉네임 중복검사
    @PostMapping("/check-nickname")
    public boolean checkNicknameExists(@RequestParam("nickname") String nickname) {
        return service.checkNicknameExists(nickname);
    }

    // 비밀번호 변경
    @PutMapping("/change-password")
    @Transactional
    public void changePassword(@RequestParam("currentPassword") String currentPassword,
                            @RequestParam("newPassword") String newPassword,
                            @RequestParam("confirmNewPassword") String confirmNewPassword,
                            @AuthenticationPrincipal MyUserDetails user) {
        Member existingMember = service.getByUsername(user.getUsername());

        if (!newPassword.equals(confirmNewPassword)) {
            throw new IllegalArgumentException("변경할 비밀번호와 변경할 비밀번호 확인이 일치하지 않습니다.");
        }

        if (!passwordEncoder.matches(currentPassword, existingMember.getPwd())) {
            System.out.println("ㅋㅋㅋ 이상함 ");
            throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
        }

        System.out.println("변경해주마 ㅋㅋ");

        String encryptedNewPassword = passwordEncoder.encode(newPassword);
        existingMember.setPwd(encryptedNewPassword);
        service.updatePwd(existingMember);
    }

    // 회원 삭제
    @DeleteMapping("/delete")
    public void delete(@ModelAttribute Member member,
                        @AuthenticationPrincipal MyUserDetails user) {

        Member existingMember = service.getByUsername(user.getUsername());
        Member id = service.getById(user.getId());

        if(existingMember != null){
            service.delete(id);
        }

    }
}