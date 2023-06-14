package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Member;

@Mapper
public interface MemberRepository {
    List<Member> findAll();

    Member findById(int id);
    Member findByEamil(String email);
}