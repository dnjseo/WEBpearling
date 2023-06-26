package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.pearling.web.entity.Follow;
import com.pearling.web.entity.Member;

@Mapper
public interface FollowRepository {
    int addFollow(Follow follow);
    int deleteFollow(Follow follow);
    boolean checkFollow(Follow follow);
    
    int findFollowingCount(int toId);
    int findFollowerCount(int fromId);

    List<Member> findFollowersList(int memberId);
    List<Member> findFollowingsList(int memberId);
}