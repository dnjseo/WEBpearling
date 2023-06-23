package com.pearling.web.entity;

import java.time.LocalDate;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiaryComment {
    private Integer id;
    private Integer RegMemberId;
    private Date regDate;
    private String Content; 
    private Integer diaryPostId;
    private String regMemberNickname;
}
