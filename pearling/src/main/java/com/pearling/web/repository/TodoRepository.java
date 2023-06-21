package com.pearling.web.repository;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Todo;

@Mapper
public interface TodoRepository {
    List<Todo> findAll();
    List<Todo> findAll(String query);
    List<Todo> findByUserId(Integer memberId);
    List<Todo> findByDate(Integer memberId, LocalDate date);


    Todo findById(int id);
    int save(Todo todo);
    int update(Todo todo);
    int delete(Todo todo);

}