package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Notice;

@Mapper
public interface NoticeRepository {
    List<Notice> findAll();

    Notice findById(int id);
    int save(Notice notice);
    int delete(Notice notice);
    int update(Notice notice);
}
