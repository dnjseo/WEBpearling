package com.pearling.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class FriendTag {
    private Integer id;
    private Integer memberId;
    private Integer scheduleId;
    private Integer friendId;
}
