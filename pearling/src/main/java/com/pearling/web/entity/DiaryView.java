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
public class DiaryView {
    private Integer id;
    private LocalDate date;
    private String title;
    private String content;
    private String image;
    private Date regdate;
    private Integer view;
    private Integer memberId;
    private Integer diaryScopeId;
    private int likeCount;
    private int like;
    private int commentCount;
    private int comment;
}
