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
    
    void registerMember(Member member); // 회원 등록을 위한 메서드 추가
    int updateMember(Member member); // 회원 수정을 위한 메서드 추가
    String uploadProfileImage(MultipartFile file, HttpServletRequest request) throws IOException;
	boolean isValid(String email, String pwd); // 비밀번호 찾기
}