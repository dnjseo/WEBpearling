package com.pearling.web.entity;

import java.time.LocalDate;
import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Todo {
    private Integer id;
    private LocalDate date;
    private Date regDate;
    private boolean statement;
    private Integer memberId;
    private String content;
    private String profileImage; // 추가된 필
}