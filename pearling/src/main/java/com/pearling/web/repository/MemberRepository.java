package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Member;

@Mapper
public interface MemberRepository {
    List<Member> findAll(String query);
    List<Member> findByUserId(int memberId);
    Member findByUsername(String username);
    Member findById(int id);
    Member findByEmail(String email);
    List<Member> findByQuery(String query);
    List<Member> findAll();

    int updateMember(Member existingMember); // 업데이트하기
    void insertMember(Member member); // insertMember 메서드 추가
}
