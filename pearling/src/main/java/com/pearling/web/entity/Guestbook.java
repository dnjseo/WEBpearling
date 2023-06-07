package com.pearling.web.entity;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Guestbook {
    private int id; 
    private String content; 
    private Date regdate; 
    private int userId;
}