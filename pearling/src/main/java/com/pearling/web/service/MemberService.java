package com.pearling.web.service;

import java.util.List;

import com.pearling.web.entity.Member;

public interface MemberService {
    
    List<Member> getList();

    Member getById(int id);
    Member getByEmail(String email);
	boolean isValid(String email, String pwd);
}