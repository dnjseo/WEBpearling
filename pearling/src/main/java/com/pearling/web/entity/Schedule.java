package com.pearling.web.entity;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

import org.springframework.cglib.core.Local;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Schedule {
    private Integer id;
    private LocalDate startDate;
    private LocalTime startTime;
    private LocalDate endDate;
    private LocalTime endTime;
    private Date regDate;
    private String title;
    private Integer memberId;
    private String backgroundColor; 
    private Double latitude;
    private Double longitude;
}
