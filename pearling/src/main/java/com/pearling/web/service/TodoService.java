package com.pearling.web.service;

import java.time.LocalDate;
import java.util.List;

import com.pearling.web.entity.Todo;

public interface TodoService {

    List<Todo> getList();
    List<Todo> getListByQuery(String query);
    List<Todo> getListByUserId(Integer userId);
    List<Todo> getListByDate(Integer userId, LocalDate date);
    
    Todo findById(Integer id);
    int addTodo(Todo todo);
    int updateTodo(Todo todo);
    int deleteTodo(Todo todo);
}