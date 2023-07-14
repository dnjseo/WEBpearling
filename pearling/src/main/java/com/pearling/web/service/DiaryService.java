package com.pearling.web.service;

import java.util.List;

import com.pearling.web.entity.Diary;
import com.pearling.web.entity.DiaryView;

public interface DiaryService {
    List<Diary> getList();
    List<Diary> getList(int offset, int pageSize);
    List<Diary> getList(int offset, int pageSize, String query);
    List<Diary> getListByDate(String date, Integer memberId);
    List<Diary> getListByUserId(Integer memberId);
    
    List<DiaryView> getViewList();
    List<DiaryView> getViewListByDate(String date, Integer memberId);

    Diary findById(Integer id);
    DiaryView findByViewId(Integer id, Integer memberId);

    void append(Diary diary);
    void update(Diary diary);
    void delete(Diary diary);
    void delete(Integer id);

    int allCount();
    int getTotalCountWithQuery(String query);
}
