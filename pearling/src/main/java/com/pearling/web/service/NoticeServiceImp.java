package com.pearling.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Notice;
import com.pearling.web.repository.NoticeRepository;

@Service
public class NoticeServiceImp implements NoticeService{
    
    @Autowired
    private NoticeRepository repository;

    @Override
    public List<Notice> getList() {
        List<Notice> list = repository.findAll();

        return list;
    }

    @Override
    public int count() {
        return 0;
    }

    @Override
    public Notice findById(int id) {
       return repository.findById(id);
    }

    @Override
    public void addNotice(Notice notice) {
       
    }

    @Override
    public void updateNotice(Notice notice) {
       }

    @Override
    public void deleteNotice(Notice notice) {
    }

}
