package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Guestbook;

@Mapper
public interface GuestbookRepository {
    List<Guestbook> findAll();
    
    // List<Guestbook> findById(int id);
    int save(Guestbook guestbook);
    int update(Guestbook guestbook);
    int delete(int id);

    int count();
}