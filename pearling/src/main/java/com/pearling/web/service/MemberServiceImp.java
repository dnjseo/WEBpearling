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
        List<Member> list = repository.findAll();

        return list;
    }

    @Override
    public Member getById(int id) {
        return repository.findById(id);
    }

    @Override
    public Member getByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public boolean isValid(String email, String pwd) {
        Member user = repository.findByEmail(email);
      
      if(user == null)
         return false;
      else if(!user.getPwd().equals(pwd))
         return false;
      
      return true;
    }

    @Override
    public List<Member> getListByQuery(String query) {
        return repository.findAll(query);
    }

    @Override
    public Member getByUsername(String username) {
        
        return repository.findByUsername(username);
    }

   



   
}
