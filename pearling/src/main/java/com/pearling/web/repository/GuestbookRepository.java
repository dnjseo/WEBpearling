package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.pearling.web.entity.Guestbook;
import com.pearling.web.entity.GuestbookView;

@Mapper
public interface GuestbookRepository {

    List<Guestbook> findAll(@Param("offset") int offset, @Param("pageSize") int pageSize);
    List<Guestbook> findAllWithQuery(@Param("offset") int offset, @Param("pageSize") int pageSize, @Param("query") String query);
    List<Guestbook> findByAll(Integer toId);

    GuestbookView findById(Integer id);

    
    void insert(Guestbook guestbook);
    void update(Guestbook guestbook);
    
    int delete(Integer id);
    int count(Integer toId);
    int allCount();
    int getTotalCountWithQuery(@Param("query") String query);
}