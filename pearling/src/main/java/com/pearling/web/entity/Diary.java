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
public class Diary {
    private Integer id;
    private LocalDate date;
    private String title;
    private String content;
    private String image;
    private Date regdate;
    private Integer view;
    private Integer memberId;
    private Integer diaryScopeId;

    private String memberNickname;
}
