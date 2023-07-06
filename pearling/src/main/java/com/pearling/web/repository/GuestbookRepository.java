package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Guestbook;
import com.pearling.web.entity.GuestbookView;

@Mapper
public interface GuestbookRepository {

    List<Guestbook> findAll();
    List<Guestbook> findByAll(Integer toId);

    GuestbookView findByViewId(Integer id, Integer memberId);
    
    int save(Guestbook guestbook);
    void addGuestbook(Guestbook guestbook);
    int update(Guestbook guestbook);
    int delete(Integer id);
}