package com.pearling.web.service;

import java.time.LocalDate;
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

    @Override
    public Todo findById(Integer id) {

        return repository.findById(id);
    }

    @Override
    public List<Todo> getListByUserId(Integer userId) {

        return repository.findByUserId(userId);
    }

    @Override
    public List<Todo> getListByDate(Integer userId, LocalDate date) {
        
        return repository.findByDate(userId, date);
    }

    @Override
    public int addTodo(Todo todo) {

        return repository.save(todo);
    }

    @Override
    public int updateTodo(Todo todo) {

        return repository.update(todo);
    }

    @Override
    public void deleteTodo(Todo todo) {

    }

    @Override
    public List<Todo> getListByQuery(String query) {
       return repository.findAll(query);
    }

    
}