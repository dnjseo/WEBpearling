package com.pearling.web.entity;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Notice {
    private Integer id;
    private String title;
    private String content;
    private Date regdate;
}
