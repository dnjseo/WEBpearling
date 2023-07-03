package com.pearling.web.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class ElapsedTimeCalculator {
    public static final int SEC = 60;
    public static final int MIN = 60;
    public static final int HOUR = 24;
    public static final int WEEK = 7;
    public static final int MONTH = 12;

    public static String getElapsedTime(Date date) {
        long curTime = System.currentTimeMillis();
        long regTime = date.getTime();
        long diffTime = curTime - regTime;

        long seconds = diffTime / 1000;
        long minutes = seconds / 60;
        long hours = minutes / 60;
        long days = hours / 24;
        long weeks = days / WEEK;
        long months = days / 30;

        String msg;

        if (months > 0) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
            msg = dateFormat.format(date);
        } else if (weeks > 0) {
            msg = weeks + "주 전";
        } else if (days >= 7) {
            msg = days + "일 전";
        } else if (hours > 0) {
            msg = hours + "시간 전";
        } else if (minutes > 0) {
            msg = minutes + "분 전";
        } else {
            msg = "방금 전";
        }

        return msg;
    }
}




