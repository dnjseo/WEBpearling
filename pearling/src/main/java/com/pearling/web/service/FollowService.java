package com.pearling.web.service;

import java.util.List;

import com.pearling.web.entity.Follow;
import com.pearling.web.entity.Member;

public interface FollowService {

    Follow findById(int id);

    void addFollow(Follow follow);
    void deleteFollow(Follow follow);
    
    int getFollowingCount(int followingId);
    int getFollowerCount(int followerId);

    List<Member> getFollowersList(int memberId);
    List<Member> getFollowingsList(int memberId);
}
