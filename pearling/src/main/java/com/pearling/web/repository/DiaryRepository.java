package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Diary;

@Mapper
public interface DiaryRepository {
    List<Diary> findAll();

    Diary findById(int id);
    int save(Diary diary);
    int update(Diary diary);
    int delete(Diary diary);
}