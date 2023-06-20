package com.pearling.web.service;

import java.time.LocalDate;
import java.util.List;

import com.pearling.web.entity.Schedule;

public interface ScheduleService {
    List<Schedule> getList();
    List<Schedule> getListByUserId(Integer memberId);
    List<Schedule> getListByDate(Integer memberId, LocalDate date);
    List<Schedule> getListByQuery(String query);

    Schedule get(Integer id);
    Schedule findById(Integer id);
    void addSchedule(Schedule schedule);
    void updateSchedule(Schedule schedule);
    void deleteSchedule(Schedule schedule);

    
}
