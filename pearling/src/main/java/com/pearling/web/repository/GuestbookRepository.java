package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Guestbook;
import com.pearling.web.entity.GuestbookView;

@Mapper
public interface GuestbookRepository {

    List<Guestbook> findAll();
    List<Guestbook> findByAll(Integer toId);

    GuestbookView findById(Integer id);

    int count(Integer toId); // 방명록 count
    
    void insert(Guestbook guestbook);
    void update(Guestbook guestbook);
    int delete(Integer id);
}