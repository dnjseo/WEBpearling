package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Schedule;

@Mapper
public interface ScheduleRepository {
    List<Schedule> findAll();

    Schedule findById(int id);
    int save(Schedule schedule);
    int update(Schedule schedule);
    int delete(Schedule schedule);
}
