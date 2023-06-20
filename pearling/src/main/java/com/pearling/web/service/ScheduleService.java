package com.pearling.web.service;

import java.time.LocalDate;
import java.util.List;

import com.pearling.web.entity.Schedule;

public interface ScheduleService {
    List<Schedule> getList();
    List<Schedule> getListByUserId(int memberId);
    List<Schedule> getListByDate(int memberId, LocalDate date);
    List<Schedule> getListByQuery(String query);

    Schedule get(int id);
    Schedule findById(int id);
    void addSchedule(Schedule schedule);
    void updateSchedule(Schedule schedule);
    void deleteSchedule(Schedule schedule);

    
}
