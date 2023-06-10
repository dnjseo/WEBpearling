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

    @Override
    public int count() {
        return 0;    
    }

    @Override
    public Qa findById(int id) {
        return null;
    }

    @Override
    public void addQa(Qa qa) {
       
    }

    @Override
    public void updateQa(Qa qa) {
    
    }

    @Override
    public void deleteQa(Qa qa) {
    
    }
    
}
