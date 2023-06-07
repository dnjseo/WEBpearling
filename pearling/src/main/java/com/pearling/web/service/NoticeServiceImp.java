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

}
