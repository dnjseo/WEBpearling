package com.pearling.web.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class ElapsedTimeCalculator {
    public static final int SEC = 60;
    public static final int MIN = 60;
    public static final int HOUR = 24;
    public static final int DAY = 7;
    public static final int MONTH = 12;

    public static String getElapsedTime(Date date) {
        long curTime = System.currentTimeMillis();
        long regTime = date.getTime();
        long diffTime = (curTime - regTime) / 1000;

        String msg;

        if (diffTime < SEC) {
            msg = "방금 전";
        } else if ((diffTime /= SEC) < MIN) {
            msg = diffTime + "초 전";
        } else if ((diffTime /= MIN) < HOUR) {
            msg = diffTime + "분 전";
        } else if ((diffTime /= HOUR) < DAY) {
            msg = diffTime + "시간 전";
        } else if ((diffTime /= DAY) < MONTH) {
            msg = diffTime + "일 전";
        } else {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
            msg = dateFormat.format(date);
        }

        return msg;
    }
}

