package com.pearling.web.service;

import java.util.List;

import com.pearling.web.entity.Guestbook;
import com.pearling.web.entity.GuestbookView;

public interface GuestbookService {

    List<Guestbook> getList(int offset, int pageSize);
    List<Guestbook> getList(int offset, int pageSize, String query);
    List<Guestbook> getGuestBookList(Integer toId);

    GuestbookView getGuestbookById(Integer id);

    void add(Guestbook guestbook);
    void update(Guestbook guestbook);
    void delete(Integer id);

    int count(Integer toId);
    int allCount();
    int getTotalCountWithQuery(String query);
}