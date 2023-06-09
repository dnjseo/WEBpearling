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
    private String imageUrl; // 이미지 URL 속성 추가

    // 생성자, getter, setter 등 필요한 메서드들 추가
    public Guestbook(int id, String content, Date regdate, int userId, String imageUrl) {
        this.id = id;
        this.content = content;
        this.regdate = regdate;
        this.userId = userId;
        this.imageUrl = imageUrl;
    }
}