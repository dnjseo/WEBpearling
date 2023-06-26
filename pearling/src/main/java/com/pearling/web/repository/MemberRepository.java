package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Member;

@Mapper
public interface MemberRepository {
    List<Member> findAll(String query);
    List<Member> findByUserId(int memberId);
    List<Member> findByQuery(String query);
    List<Member> findAll();

    Member findByUsername(String username);
    Member findById(int id);
    Member findByEmail(String email);
    Member findByNickname(String nickname); // 닉네임으로 회원 조회

    int insertMember(Member member); // 회원가입 추가
    int updateMember(Member existingMember); // 업데이트하기
    int updatePwd(Member member); // 비밀번호 업데이트하기
}
