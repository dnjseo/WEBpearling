package com.pearling.web.entity;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    private Integer id; 
    private String name; 
    private String pwd; 
    private String nickname; 
    private String email; 
    private LocalDate birth; 
    private String profileImage;
    private Integer roleId;

    private String fullEmail; // 도메인과 이메일 주소를 합친 이메일

    // 비밀번호 변경
    private String currentPassword;
    private String newPassword;
    private String confirmPassword;
}