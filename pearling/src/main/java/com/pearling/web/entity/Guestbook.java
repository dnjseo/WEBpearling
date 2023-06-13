package com.pearling.web.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Guestbook {
    private int id;
    private String content;
    private Date regdate;
    private int userId;
    private String imageUrl; // 이미지 URL 속성 추가
}