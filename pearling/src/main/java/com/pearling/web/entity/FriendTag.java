package com.pearling.web.entity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class FriendTag {
    private Integer id;
    private User user;
private Schedule schedule;
    // user_id, schedule_id
}
