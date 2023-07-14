package com.pearling.web.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Qa {
    private Integer id;
    private String title;
    private String content;
    private Date regdate;
    private Integer memberId;
    private Integer securityCheck;
    private String memberNickname;
    private Integer qaStatus;
    private Integer newId;
}