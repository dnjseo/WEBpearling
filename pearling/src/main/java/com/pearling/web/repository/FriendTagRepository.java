package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.FriendTag;

@Mapper
public interface FriendTagRepository {

    FriendTag findById(int memberId, int scheduleId);
    FriendTag findByIdandNickname(int scheduleId, String nickname);
  
    int save(FriendTag friendTag);
    int delete(FriendTag friendTag);

    List<FriendTag> findByScheduleId(int scheduleId);
    List<String> findNicknameByScheduleId(int friendId);
}
