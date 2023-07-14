package com.pearling.web.repository;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.pearling.web.entity.FriendTag;
import com.pearling.web.entity.Schedule;

@Mapper
public interface ScheduleRepository {
    List<Schedule> findAll();
    List<Schedule> findAllAdmin(@Param("offset") int offset, @Param("pageSize") int pageSize);
    List<Schedule> findAllWithQuery(@Param("offset") int offset, @Param("pageSize") int pageSize, @Param("query") String query);
    List<Schedule> findAllSch(String query);
    List<Schedule> findByUserId(Integer memberId);
    List<Schedule> findByDate(Integer memberId, LocalDate date);
    List<Schedule> findByCurDate(Integer memberId, LocalDate date);

    Schedule findById(Integer id);
    int save(Schedule schedule);
    int update(Schedule schedule);
    int delete(Schedule schedule);
    int deleteAdmin(Integer id);
    
    void saveFriendTag(FriendTag friendTag);
    List<FriendTag> findFriendTagsByScheduleId(Integer scheduleId);
    void deleteFriendTag(FriendTag friendTag);

    int allCount();
    int getTotalCountWithQuery(@Param("query") String query);
}
