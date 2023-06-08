package com.pearling.web.entity;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Schedule {
    private int id;
    private Date startDate;
    private Date endDate;
    private Date regDate;
    private String location;
    private String title;
    private int userId;
    private String backgroundColor; 
}