package com.pearling.web.service;

import java.util.List;

import com.pearling.web.entity.Guestbook;
import com.pearling.web.entity.GuestbookView;

public interface GuestbookService {

    List<Guestbook> getList();
    List<Guestbook> getGuestBookList(Integer toId);

    GuestbookView findByViewId(Integer id, Integer memberId);

    void addGuestbook(Guestbook guestbook);
    void updateGuestbook(Guestbook guestbook);
    void deleteGuestbook(Integer id);
}
