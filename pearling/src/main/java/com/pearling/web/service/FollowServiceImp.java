package com.pearling.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Follow;
import com.pearling.web.entity.Member;
import com.pearling.web.repository.FollowRepository;

@Service
public class FollowServiceImp implements FollowService{

    @Autowired FollowRepository repository;

    @Override
    public void addFollow(Follow follow) {
        repository.addFollow(follow);
    }

    @Override
    public void deleteFollow(Follow follow) {
        repository.deleteFollow(follow);
    }

    @Override
    public boolean checkFollow(Follow follow) {
    
        return repository.checkFollow(follow);
    }    

    @Override
    public void getFollowingCount(int toId) {
        repository.findFollowingCount(toId);
    }

    @Override
    public void getFollowerCount(int fromId) {
        repository.findFollowerCount(fromId);
    }

    @Override
    public List<Member> getFollowersList(int memberId) {
        return repository.findFollowersList(memberId);
    }

    @Override
    public List<Member> getFollowingsList(int memberId) {
       return repository.findFollowingsList(memberId);
    }
    
}
