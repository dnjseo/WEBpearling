package com.pearling.web.service;

import java.time.LocalDate;
import java.util.List;

import com.pearling.web.entity.Schedule;

public interface ScheduleService {
    List<Schedule> getList();
    List<Schedule> getList(int offset, int pageSize);
    List<Schedule> getList(int offset, int pageSize, String query);
    List<Schedule> getListByUserId(Integer memberId);
    List<Schedule> getListByDate(Integer memberId, LocalDate date);
    List<Schedule> getListByQuery(String query);
    List<Schedule> getListByCurDate(Integer memberId, LocalDate date);

    Schedule get(Integer id);
    Schedule findById(Integer id);
    int addSchedule(Schedule schedule);
    void updateSchedule(Schedule schedule);
    int deleteSchedule(Schedule schedule);
    void delete(Integer id);

    int allCount();
    int getTotalCountWithQuery(String query);
}
