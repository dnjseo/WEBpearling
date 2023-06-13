package com.pearling.web.entity;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Diary {
    private int id;
    private Date date;
    private String content;
    private String image;
    private Date regdate;
    private int view;
    private int userID;
    private int diaryScopeId;
    private String title;
}
