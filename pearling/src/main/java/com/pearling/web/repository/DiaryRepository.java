package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Diary;
import com.pearling.web.entity.DiaryView;

@Mapper
public interface DiaryRepository {
    List<Diary> findAll();
    List<Diary> findByDate(String date, Integer memberId);

    List<DiaryView> findViewAll();
    List<DiaryView> findViewAll(String date, Integer memberId);

    Diary findById(Integer id);
    int save(Diary diary);
    int update(Diary diary);
    int delete(Diary diary);
}
