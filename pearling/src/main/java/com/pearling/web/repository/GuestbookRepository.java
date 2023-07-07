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

    int save(Guestbook guestbook);
    void addGuestbook(Guestbook guestbook);
    void updateGuestbook(Guestbook guestbook);
    int delete(Integer id);
}