package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.pearling.web.entity.Diary;
import com.pearling.web.entity.DiaryView;

@Mapper
public interface DiaryRepository {
    List<Diary> findAll();
    List<Diary> findAllAdmin(@Param("offset") int offset, @Param("pageSize") int pageSize);
    List<Diary> findAllWithQuery(@Param("offset") int offset, @Param("pageSize") int pageSize, @Param("query") String query);
    List<Diary> findByDate(String date, Integer memberId);
    List<Diary> findByUserid(Integer memberId);

    List<DiaryView> findViewAll();
    List<DiaryView> findViewAll(String date, Integer memberId);

    Diary findById(Integer id);
    DiaryView findByViewId(Integer id, Integer memberId);

    int save(Diary diary);
    int update(Diary diary);
    int delete(Diary diary);
    int deleteAdmin(Integer id);

    int allCount();
    int getTotalCountWithQuery(@Param("query") String query);
}
