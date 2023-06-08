package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Todo;

@Mapper
public interface TodoRepository {
    List<Todo> findAll();

    Todo findById(int id);
    int save(Todo todo);
    int update(Todo todo);
    int delete(Todo todo);
}