package com.pearling.web.repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Schedule;

@Mapper
public interface ScheduleRepository {
    List<Schedule> findAll();
    List<Schedule> findAllSch(String query);
    List<Schedule> findByUserId(int memberId);
    List<Schedule> findByDate(int memberId, LocalDate date);

    Schedule findById(int id);
    int save(Schedule schedule);
    int update(Schedule schedule);
    int delete(int id);

}
