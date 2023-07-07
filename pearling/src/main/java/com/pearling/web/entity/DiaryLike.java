package com.pearling.web.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiaryLike {
    private Integer idx;
    private Integer diaryId;
    private Integer memberId;
}
