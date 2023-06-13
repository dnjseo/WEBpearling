package com.pearling.web.entity;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Diary {
    private Integer id;
    private Date date;
    private String content;
    private String image;
    private Date regdate;
    private Integer view;
    private Integer userID;
    private Integer diaryScopeId;
    private String title;
}
