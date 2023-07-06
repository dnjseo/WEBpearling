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
public class GuestbookView {
    private Integer id;
    private String content;
    private Date regdate;
    private Integer fromId;
    private Integer toId;
}