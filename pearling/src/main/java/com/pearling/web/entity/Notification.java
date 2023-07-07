package com.pearling.web.entity;

import java.time.LocalDate;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    private Integer id;
    private Integer pubMemberId;
    private Integer subMemberId;
    private String message;
    private Date regDate;
    private boolean isRead;
    private Integer type;
}
