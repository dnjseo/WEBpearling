package com.pearling.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Todo;
import com.pearling.web.repository.TodoRepository;

@Service
public class TodoServiceImp implements TodoService{
    
    @Autowired
    private TodoRepository repository;

    @Override
    public List<Todo> getList() {
        List<Todo> list = repository.findAll();

        return list;
    }

    
}