package com.pearling.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Qa;
import com.pearling.web.repository.QaRepository;

@Service
public class QaServiceImp implements QaService{

    @Autowired
    private QaRepository repository;

    @Override
    public List<Qa> getList() {
        List<Qa> list = repository.findAll();

        return list;
    }
    
}
