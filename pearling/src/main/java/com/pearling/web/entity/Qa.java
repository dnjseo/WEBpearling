package com.pearling.web.entity;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Qa {
    private Integer id;
    private String title;
    private String content;
    private Date regdate;
    private String answer;
    private Integer userId;
    private Integer qaCategoryId;
    private Integer newId;
    private String qaCategoryName;
}