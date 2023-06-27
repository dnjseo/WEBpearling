package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.GuestBookView;
import com.pearling.web.entity.Guestbook;

@Mapper
public interface GuestbookRepository {
    List<Guestbook> findAll();
    List<Guestbook> findById(Integer toId);

    List<GuestBookView> findByAll();
    List<GuestBookView> findByAll(Integer toId);

    int save(Guestbook guestbook);
    int update(Guestbook guestbook);
    int delete(int id);

    int count();
}