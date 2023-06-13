package com.pearling.web.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Diary;
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
    public List<Diary> getListByDate(Date date) {
        return null;
    }

    @Override
    public Diary findById(int id) {
        return repository.findById(id);
    }

    @Override
    public void addDiary(Diary diary) {
    }

    @Override
    public void updateDiary(Diary diary) {
    }

    @Override
    public void deleteDiary(Diary diary) {
    }

}
