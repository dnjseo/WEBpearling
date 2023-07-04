package com.pearling.web.entity;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OurshellView {

    Integer id;
    Integer followerId;
    Integer followingId;
    String nickname;
    String profileImage;
    LocalDate birth;
    Integer memberId;
    LocalDate scheduleStartDate;
    LocalDate scheduleEndDate;
    String scheduleTitle;
    Integer scheduleId;
    LocalDate todoDate;
    Boolean todoStatement;
    Integer todoId;
    String todoContent;

}
