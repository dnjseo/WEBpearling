package com.pearling.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Guestbook;
import com.pearling.web.repository.GuestbookRepository;

@Service
public class GuestbookServiceImp implements GuestbookService{
    
    @Autowired
    private GuestbookRepository repository;

    @Override
    public List<Guestbook> getList() {
        List<Guestbook> list = repository.findAll();

        return list;
    }

    
}