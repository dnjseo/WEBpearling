package com.pearling.web.repository;

import java.util.List;
import java.util.Optional;

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
    Member findByNickname(String nickname);
    Member findByProviderId(String providerId);

    int insertMember(Member member); // 회원가입 추가
    int updateMember(Member existingMember); // 업데이트하기
    int updatePwd(Member member); // 비밀번호 업데이트하기
    void delete(Member member);

    Optional<Member> findByLoginId(String loginId); // 추가된 메소드

    String findNicknameById(int id); // 아이디로 닉네임 찾기
}
