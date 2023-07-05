package com.pearling.web.security.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    private String type;
    private String sender;
    private String receiver;
    private Object data;

    public void newConnect() {
        this.type = "new";
    }

    public void closeconnect() {
        this.type = "close";
    }

    public static Object builder() {
        return null;
    }


}
