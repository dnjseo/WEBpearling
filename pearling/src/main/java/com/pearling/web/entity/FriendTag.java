package com.pearling.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendTag {
    private Integer id;
    private Integer userId;
    private Integer firendId;
    private Integer scheduleId;
}
