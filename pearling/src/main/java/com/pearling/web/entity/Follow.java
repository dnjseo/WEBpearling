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
    private int followerId;  // 로그인한 사용자가 팔로우한 사용자의 memberId (팔로워)
    private int followingId; // 로그인한 사용자의 memberId (팔로잉)
    private String nickname;
    private String profileImage;
    private int statusId;
    private int isFollower;
}
