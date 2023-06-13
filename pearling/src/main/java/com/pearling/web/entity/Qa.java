package com.pearling.web.entity;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Qa {
    private int id;
    private String title;
    private String content;
    private Date regdate;
    private String answer;
    private int userId;
    private int qaCategoryId;
    private int newId;
}