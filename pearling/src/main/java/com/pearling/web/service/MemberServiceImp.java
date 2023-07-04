package com.pearling.web.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pearling.web.entity.Member;
import com.pearling.web.repository.MemberRepository;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class MemberServiceImp implements MemberService{

    @Autowired
    private MemberRepository repository;

    // 멤버 리스트
    @Override
    public List<Member> getList() {
        List<Member> list = repository.findAll();
        return list;
    }
    
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

    // 회원가입
    @Override
    public void add(Member member) {
        repository.insertMember(member);
    }

    // 이메일 중복검사
    @Override
    public boolean checkEmailExists(String email) {
        Member existingMember = repository.findByEmail(email);
        return existingMember != null;
    }

    // 닉네임 중복검사
    @Override
    public boolean checkNicknameExists(String nickname) {
        Member existingMember = repository.findByNickname(nickname);
        return existingMember != null;
    }

    // 회원 수정
    @Override
    public int updateMember(Member member) {
        Member existingMember = repository.findById(member.getId());

        if (existingMember != null) {
            // 업데이트할 필드 설정
            existingMember.setName(member.getName());
            existingMember.setNickname(member.getNickname());
            existingMember.setProfileImage(member.getProfileImage());

            return repository.updateMember(existingMember); // 회원 정보 업데이트
        } else {
            throw new RuntimeException("ID가 " + member.getId() + "인 회원을 찾을 수 없습니다.");
        }
    }

    // 다시 해보기
    @Override
    public String uploadProfileImage(MultipartFile file,
                                    HttpServletRequest request) throws IOException {
        if (!file.isEmpty()) {

            String uploadDir = request.getServletContext().getResource("/resources/img/").getPath();
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            String filePath = uploadDir + fileName;
            File destination = new File(filePath);

            System.out.println("비어있지 않습니다 !! ");
            System.out.println(destination);

            file.transferTo(destination);
            return fileName; // 프로필 이미지 경로 반환
        }

        System.out.println("안된단다...");

        return null;
    }

    // 비밀번호 변경
    @Override
    public void updatePwd(Member member) {
        repository.updatePwd(member);
    }

    // 회원삭제
    @Override
    public void delete(Member member) {
        repository.delete(member);
    }

    // 로그인 api 아이디 찾기
    @Override
    public Member getByProviderId(String providerId) {
        return repository.findByProviderId(providerId);
    }
}