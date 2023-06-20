package com.pearling.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Member;
import com.pearling.web.repository.MemberRepository;

@Service
public class MemberServiceImp implements MemberService{

    @Autowired
    private MemberRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 멤버 리스트
    @Override
    public List<Member> getList() {
        List<Member> list = repository.findAll();

        return list;
    }

    // 
    @Override
    public List<Member> getListByQuery(String query) {
        return repository.findAll(query);
    }

    @Override
	public List<Member> getListByUserId(int userId) {
        return repository.findByUserId(userId);
	}

    // 아이디 
    @Override
    public Member getById(int id) {
        return repository.findById(id);
    }
    
    // 이름 
    @Override
    public Member getByUsername(String username) {
        return repository.findByUsername(username);
    }

    // 이메일 
    @Override
    public Member getByEmail(String email) {
        return repository.findByEmail(email);
    }

    // 회원 등록
    @Override
    public void registerMember(Member member) {

        // 이메일 주소 설정
        String fullEmail = member.getEmail() + "@" + member.getDomain();
        member.setEmail(fullEmail);

        // 비밀번호 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPwd());
        member.setPwd(encryptedPassword);

        // 프로필 사진이 null인 경우 기본 이미지 경로로 설정
        if (member.getProfileImage() == null) {
            member.setProfileImage("/images/profile/basic.png");
        }

        repository.insertMember(member);
    }

    // 회원 수정
    @Override
    public void updateMember(Member member) {
       Member existingMember = repository.findById(member.getId());

       if (existingMember != null) {
        // 업데이트할 필드 설정
        existingMember.setName(member.getName());
        existingMember.setNickname(member.getNickname());
        // 필요한 다른 필드 업데이트
        
        repository.updateMember(existingMember); // 회원 정보 업데이트
    } else {
        throw new RuntimeException("Member not found with id: " + member.getId());
    }
    }
    
    // 비밀번호 찾기
    @Override
    public boolean isValid(String email, String pwd) {
        Member user = repository.findByEmail(email);
      
      if(user == null)
         return false;
      else if(!user.getPwd().equals(pwd))
         return false;
      
      return true;
    }

}