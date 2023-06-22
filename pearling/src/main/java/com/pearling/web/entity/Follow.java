package com.pearling.web.entity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Follow {
    private int id;
    private int ToId;
    private int fromId;
}
