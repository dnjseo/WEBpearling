package com.pearling.web.service;

import java.util.List;

import com.pearling.web.entity.Guestbook;

public interface GuestbookService {
    List<Guestbook> getGuestBookList(Integer toId);

    void addGuestbook(Guestbook guestbook);
    void updateGuestbook(Guestbook guestbook);
    void deleteGuestbook(int id);
}
