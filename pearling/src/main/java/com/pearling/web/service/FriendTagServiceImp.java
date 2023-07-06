package com.pearling.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.FriendTag;
import com.pearling.web.repository.FriendTagRepository;

@Service
public class FriendTagServiceImp implements FriendTagService{

    @Autowired
    FriendTagRepository repository;

    @Override
    public int append(FriendTag friendTag) {
        
        return repository.save(friendTag);
    }

    @Override
    public int delete(FriendTag friendTag) {
      
        return repository.delete(friendTag);
    }
    
}
