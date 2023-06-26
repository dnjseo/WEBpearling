package com.pearling.web.api.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pearling.web.api.controller.MemberController.CheckEmaileRequest;
import com.pearling.web.entity.Member;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.MemberService;


import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController("apiMemberController")
@RequestMapping("api/member")
public class MemberController {

    @Autowired
    private MemberService service;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 회원가입
    @PostMapping
    public void post(@RequestBody MemberRequest memberRequest) {

        String fullEmail = memberRequest.getEmail() + "@" + memberRequest.getDomain();
        String encodedPwd = passwordEncoder.encode(memberRequest.getPwd());

        Member member = Member.builder()
                        .email(fullEmail)
                        .pwd(encodedPwd)
                        .name(memberRequest.getName())
                        .nickname(memberRequest.getNickname())
                        .birth(memberRequest.getBirth())
                        .build();
        service.add(member);

        System.err.println("회원가입 레스트 컨트롤러 입니다!");
    }

    // 이메일 중복 검사
    @PostMapping("/check-email")
    public boolean checkEmailExists(@RequestBody CheckEmaileRequest checkEmailRequest) {
        String checkEmail = checkEmailRequest.getCheckEmail();
        return service.checkEmailExists(checkEmail);
    }

    // 닉네임 중복검사
    @PostMapping("/check-nickname")
    public boolean checkNicknameExists(@RequestBody CheckNicknameRequest checkNicknameRequest) {
        String checkNickname = checkNicknameRequest.getCheckNickname();
        return service.checkNicknameExists(checkNickname);
    }

    // 프로필 업데이트


    // 비밀번호 변경
    @PutMapping("/change-password")
    @Transactional
    public void changePassword(@RequestBody ChangePasswordRequest changePasswordRequest,
                               @AuthenticationPrincipal MyUserDetails user) {
        Member existingMember = service.getByUsername(user.getUsername());
        String currentPassword = changePasswordRequest.getCurrentPassword();
        String newPassword = changePasswordRequest.getNewPassword();
        String confirmNewPassword = changePasswordRequest.getConfirmNewPassword();

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

    // getter setter

    // 이메일 중복 체크
    public static class CheckEmaileRequest {
        private String checkEmail;

        public String getCheckEmail() {
            return checkEmail;
        }

        public void setCheckEmailname(String checkEmail) {
            this.checkEmail = checkEmail;
        }
    }

    // 닉네임 중복 체크
    public static class CheckNicknameRequest {
        private String checkNickname;

        public String getCheckNickname() {
            return checkNickname;
        }

        public void setCheckNickname(String checkNickname) {
            this.checkNickname = checkNickname;
        }
    }

    // 비밀번호 변경
    public static class ChangePasswordRequest {
        private String currentPassword;
        private String newPassword;
        private String confirmNewPassword;

        public String getCurrentPassword() {
            return currentPassword;
        }

        public void setCurrentPassword(String currentPassword) {
            this.currentPassword = currentPassword;
        }

        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }

        public String getConfirmNewPassword() {
            return confirmNewPassword;
        }

        public void setConfirmNewPassword(String confirmNewPassword) {
            this.confirmNewPassword = confirmNewPassword;
        }
    }
    
    // 회원가입
    public static class MemberRequest {
        private String fullEmail;
        private String domain;
		private String email;
		private String pwd;
		private String name;
		private String nickname;
        private LocalDate birth;

        public String getFullEmail() {
            return fullEmail;
        }

        public void setFullEmail(String fullEmail) {
            this.fullEmail = fullEmail;
        }

        public String getDomain() {
            return domain;
        }

        public void setDomain(String domain) {
            this.domain = domain;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPwd() {
            return pwd;
        }

        public void setPwd(String pwd) {
            this.pwd = pwd;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getNickname() {
            return nickname;
        }

        public void setNickname(String nickname) {
            this.nickname = nickname;
        }

        public LocalDate getBirth() {
            return birth;
        }

        public void setBirth(LocalDate birth) {
            this.birth = birth;
        }
	}
}