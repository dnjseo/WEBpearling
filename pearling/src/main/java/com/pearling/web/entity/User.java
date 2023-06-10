package com.pearling.web.entity;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class User {
    private Integer id; 
    private String name; 
    private String pwd; 
    private String nickname; 
    private String email; 
    private Date birth; 
    private String profile_image;
}
