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
    private Integer id;
    private String content;
    private Date regdate;
    private Integer fromId;
    private String imageUrl; // 이미지 URL 속성 추가
    private Integer toId;
}