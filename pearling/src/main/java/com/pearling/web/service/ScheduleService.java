package com.pearling.web.service;

import java.time.LocalDate;
import java.util.List;

import com.pearling.web.entity.Schedule;

public interface ScheduleService {
    List<Schedule> getList();
    List<Schedule> getListByUserId(int userId);
    List<Schedule> getListByDate(int userId, LocalDate date);
    List<Schedule> getListByQuery(String query);

    Schedule get(int id);
    int addSchedule(Schedule schedule);
    int updateSchedule(Schedule schedule);
    int deleteSchedule(int id);

    
}
