package com.pearling.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Follow {
    private int id;
    private int toId;  // 로그인한 사용자가 팔로우한 사용자의 memberId (팔로잉)
    private int fromId; // 로그인한 사용자의 memberId (팔로워)
    private String nickname;
    private String profileImage;
}
