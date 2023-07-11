package com.pearling.web.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Diary;
import com.pearling.web.entity.DiaryView;
import com.pearling.web.repository.DiaryRepository;

@Service
public class DiaryServiceImp implements DiaryService {

    @Autowired
    private DiaryRepository repository;

    @Override
    public List<Diary> getList() {
        List<Diary> list = repository.findAll();

        return list;
    }

    @Override
    public List<Diary> getListByDate(String date, Integer memberId) {
        return repository.findByDate(date, memberId);
    }

    @Override
    public Diary findById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public void append(Diary diary) {

        repository.save(diary);
    }

    @Override
    public void update(Diary diary) {

        repository.update(diary);
    }

    @Override
    public void delete(Diary diary) {
        
        repository.delete(diary);
    }

    @Override
    public List<DiaryView> getViewList() {
        return repository.findViewAll();
    }

    @Override
    public List<DiaryView> getViewListByDate(String date, Integer memberId) {
        return repository.findViewAll(date, memberId);
    }

    @Override
    public DiaryView findByViewId(Integer id, Integer memberId) {
        return repository.findByViewId(id, memberId);
    }

    @Override
    public List<Diary> getListByUserId(Integer memberId) {
       
        return repository.findByUserid(memberId);
    }

}
