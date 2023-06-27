package com.pearling.web.service;

import java.util.List;

import com.pearling.web.entity.GuestBookView;
import com.pearling.web.entity.Guestbook;

public interface GuestbookService {
    List<Guestbook> getList();
    List<Guestbook> getList(Integer toId);

    List<GuestBookView> getGuestBookList();
    List<GuestBookView> getGuestBookList(Integer toId);

    Guestbook findById(int id);
    void addGuestbook(Guestbook guestbook);
    void updateGuestbook(Guestbook guestbook);
    void deleteGuestbook(int id);
}
