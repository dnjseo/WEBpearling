package com.pearling.web.service;

import java.util.List;

import com.pearling.web.entity.FriendTag;

public interface FriendTagService {
    
    int append(FriendTag friendTag);
    int delete(FriendTag friendTag);

    List<FriendTag> getByScheduleId(int scheduleId);
    List<String> getFriendNicknames(int id);
}
