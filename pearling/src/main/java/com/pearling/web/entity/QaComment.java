package com.pearling.web.entity;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QaComment{
    private Integer id;
    private Date regdate;
    private String answer;
    private Integer qaId;
    private Integer roleId;
}