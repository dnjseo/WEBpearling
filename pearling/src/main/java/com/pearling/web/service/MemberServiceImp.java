package com.pearling.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Member;
import com.pearling.web.repository.MemberRepository;

@Service
public class MemberServiceImp implements MemberService{

    @Autowired
    private MemberRepository repository;

    @Override
    public List<Member> getList() {
        return null;
    }

    @Override
    public Member getById(int id) {
        return repository.findById(id);
    }

    @Override
    public Member getByEmail(String email) {
        return repository.findByEamil(email);
    }

    @Override
    public boolean isValid(String email, String pwd) {
        Member user = repository.findByEamil(email);
      
      if(user == null)
         return false;
      else if(!user.getPwd().equals(pwd))
         return false;
      
      return true;
    }



   
}