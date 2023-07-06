package com.pearling.web.repository;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.FriendTag;

@Mapper
public interface FriendTagRepository {

    FriendTag findById(int memberId, int scheduleId);
    int save(FriendTag friendTag);
    int delete(FriendTag friendTag);
}
