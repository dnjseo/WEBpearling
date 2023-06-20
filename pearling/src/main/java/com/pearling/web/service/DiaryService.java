package com.pearling.web.service;

import java.util.Date;
import java.util.List;

import com.pearling.web.entity.Diary;

public interface DiaryService {
    List<Diary> getList();
    List<Diary> getListByDate(String date, Integer memberId);

    Diary findById(Integer id);
    void addDiary(Diary diary);
    void updateDiary(Diary diary);
    void deleteDiary(Diary diary);
}
