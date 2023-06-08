package com.pearling.web.entity;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Todo {
    private Integer id;
    private Date date;
    private Date regDate;
    private boolean statement;
    private Integer userId;
    private String content;
    
}
