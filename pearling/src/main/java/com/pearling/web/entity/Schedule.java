package com.pearling.web.entity;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;

import org.springframework.cglib.core.Local;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Schedule {
    private Integer id;
    private LocalDate startDate;
    private Time startTime;
    private LocalDate endDate;
    private Time endTime;
    private Date regDate;
    private String title;
    private Integer memberId;
    private String backgroundColor; 
}
