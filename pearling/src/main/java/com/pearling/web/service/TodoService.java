package com.pearling.web.service;

import java.util.List;

import com.pearling.web.entity.Todo;

public interface TodoService {

    List<Todo> getList();

    Todo findById(int id);
    void addTodo(Todo todo);
    void updateTodo(Todo todo);
    void deleteTodo(Todo todo);
}