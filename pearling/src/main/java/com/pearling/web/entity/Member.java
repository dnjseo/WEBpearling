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
public class Member {
    private Integer id; 
    private String name; 
    private String pwd; 
    private String nickname; 
    private String email; 
    private Date birth; 
    private String profileImage;
    private Integer roleId;
}