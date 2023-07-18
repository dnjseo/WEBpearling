package com.pearling.web.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.pearling.web.entity.Member;
import com.pearling.web.repository.MemberRepository;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class MemberServiceImp implements MemberService {

    @Autowired
    private MemberRepository repository;

    // 멤버 리스트
    @Override
    public List<Member> getList() {
        List<Member> list = repository.findAll();
        return list;
    }

    @Override
    public List<Member> getList(int offset, int pageSize) {
        return repository.findAllAdmin(offset, pageSize);
    }

    @Override
    public List<Member> getList(int offset, int pageSize, String query) {
        return repository.findAllWithQuery(offset, pageSize, query);
    }

    @Override
    public List<Member> getListByQuery(String query) {
        return repository.findAll(query);
    }

    @Override
    public List<Member> getListByUserId(int userId) {
        return repository.findByUserId(userId);
    }

    @Override
    public Member getById(int id) {
        return repository.findById(id);
    }

    @Override
    public Member getByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Override
    public Member getByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public void add(Member member) {
        repository.insertMember(member);
    }

    @Override
    public boolean checkEmailExists(String email) {
        Member existingMember = repository.findByEmail(email);
        return existingMember != null;
    }

    @Override
    public boolean checkNicknameExists(String nickname) {
        Member existingMember = repository.findByNickname(nickname);
        return existingMember != null;
    }

    @Override
    public int updateMember(Member member) {
        Member existingMember = repository.findById(member.getId());

        if (existingMember != null) {
            existingMember.setName(member.getName());
            existingMember.setNickname(member.getNickname());
            existingMember.setProfileImage(member.getProfileImage());

            return repository.updateMember(existingMember); // 회원 정보 업데이트
        } else {
            throw new RuntimeException("ID가 " + member.getId() + "인 회원을 찾을 수 없습니다.");
        }
    }

    @Override
    public String uploadProfileImage(MultipartFile file,
            HttpServletRequest request) throws IOException {
        if (!file.isEmpty()) {

            String uploadDir = request.getServletContext().getResource("/resources/img/").getPath();
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            String filePath = uploadDir + fileName;
            File destination = new File(filePath);

            System.out.println(destination);

            file.transferTo(destination);
            return fileName; 
        }
        return null;
    }

    @Override
    public int allCount() {
        return repository.allCount();
    }

    @Override
    public int getTotalCountWithQuery(String query) {
        return repository.getTotalCountWithQuery(query);
    }

    @Override
    public void updatePwd(Member member) {
        repository.updatePwd(member);
    }

    @Override
    public void delete(Member member) {
        repository.delete(member);
    }

    @Override
    @Transactional
    public void deleteMembers(Integer[] memberIds) {
        for (Integer memberId : memberIds) {
            Member member = repository.findById(memberId);
            if (member != null) {
                repository.delete(member);
            } else {
                System.out.println("망함 진짜 못찾음 ㅋㅋ");
            }
        }
    }

    // 로그인 api 아이디 찾기
    @Override
    public Member getByProviderId(String providerId) {
        return repository.findByProviderId(providerId);
    }
}