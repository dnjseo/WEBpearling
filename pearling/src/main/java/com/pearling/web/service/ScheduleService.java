package com.pearling.web.service;

import java.util.Date;
import java.util.List;

import com.pearling.web.entity.Schedule;

public interface ScheduleService {
    List<Schedule> getList();
    List<Schedule> getListByDate(Date date);
    List<Schedule> getListByQuery(String query);

    Schedule findById(int id);
    void addSchedule(Schedule schedule);
    void updateSchedule(Schedule schedule);
    void deleteSchedule(Schedule schedule);

}
