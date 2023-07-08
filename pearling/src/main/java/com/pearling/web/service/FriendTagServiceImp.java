package com.pearling.web.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.FriendTag;
import com.pearling.web.repository.FriendTagRepository;
import com.pearling.web.repository.MemberRepository;

@Service
public class FriendTagServiceImp implements FriendTagService{

    @Autowired
    FriendTagRepository repository;

    @Autowired
    MemberRepository memberRepository;

    @Override
    public int append(FriendTag friendTag) {
        
        return repository.save(friendTag);
    }

    @Override
    public int delete(FriendTag friendTag) {
      
        return repository.delete(friendTag);
    }

    @Override
    public List<FriendTag> getByScheduleId(int scheduleId) {
      
        return repository.findByScheduleId(scheduleId);
    }

    @Override
    public List<String> getFriendNicknames(int id) {
  
        return repository.findNicknameByScheduleId(id);
    }
   
    
}
