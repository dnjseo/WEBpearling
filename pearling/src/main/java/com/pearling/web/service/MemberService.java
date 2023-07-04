package com.pearling.web.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.pearling.web.entity.Member;

import jakarta.servlet.http.HttpServletRequest;

public interface MemberService {
    
    List<Member> getList(); // 멤버 리스트 
    List<Member> getListByQuery(String query);
    List<Member> getListByUserId(int userId);
    
    Member getById(int id); // 아이디 
    Member getByUsername(String username); // username 
    Member getByEmail(String email); // 이메일
    
    // 회원가입
    void add(Member member); // 회원가입
    boolean checkEmailExists(String email);
    boolean checkNicknameExists(String nickname); // 닉네임 중복체크

    // 회원수정
    int updateMember(Member member); // 회원 수정을 위한 메서드 추가
    void updatePwd(Member member); // 
    String uploadProfileImage(MultipartFile file, HttpServletRequest request) throws IOException;

    // 회원 삭제
    void delete(Member member);

    // 로그인 api
    Member getByProviderId(String providerId);
}