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
    public Follow findById(int id) {
        return repository.findById(id);
    }

    @Override
    public void addFollow(Follow follow) {
        repository.addFollow(follow);
    }

    @Override
    public void deleteFollow(Follow follow) {
        repository.deleteFollow(follow);
    }

    @Override
    public int getFollowingCount(int followingId) {
        return repository.findFollowingCount(followingId);
    }

    @Override
    public int getFollowerCount(int followerId) {
        return repository.findFollowerCount(followerId);
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
