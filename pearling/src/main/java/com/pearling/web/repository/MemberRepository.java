package com.pearling.web.repository;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Member;

@Mapper
public interface MemberRepository {
    Member findById(int id);
    Member findByEamil(String email);
}
