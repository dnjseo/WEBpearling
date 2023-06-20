package com.pearling.web.service;

import java.time.LocalDate;
import java.util.List;

import com.pearling.web.entity.Todo;

public interface TodoService {

    List<Todo> getList();
    List<Todo> getListByQuery(String query);
    List<Todo> getListByUserId(int userId);
    List<Todo> getListByDate(int userId, LocalDate date);

    Todo findById(int id);
    int addTodo(Todo todo);
    int updateTodo(Todo todo);
    void deleteTodo(Todo todo);
}