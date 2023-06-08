package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Qa;

@Mapper
public interface QaRepository {
    List<Qa> findAll();

    Qa findById(int id);
    int save(Qa qa);
    int update(Qa qa);
    int delete(Qa qa);
}
