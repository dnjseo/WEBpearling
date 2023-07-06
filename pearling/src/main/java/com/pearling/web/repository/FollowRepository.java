package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Follow;
import com.pearling.web.entity.Member;

@Mapper
public interface FollowRepository {

    Follow findById(int id);

    int addFollow(Follow follow);
    int deleteFollow(Follow follow);
    
    int findFollowingCount(int followerId);
    int findFollowerCount(int followingId);

    List<Member> findFollowersList(int memberId);
    List<Member> findFollowingsList(int memberId);

    boolean checkFollow(int followingId, int followerId);
}