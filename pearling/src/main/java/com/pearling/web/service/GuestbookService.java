package com.pearling.web.service;

import java.util.List;

import com.pearling.web.entity.Guestbook;

public interface GuestbookService {
    List<Guestbook> getList();

    Guestbook findById(int id);
    void addGuestbook(Guestbook guestbook);
    void updateGuestbook(Guestbook guestbook);
    // 삭제 기능
    void deleteGuestbook(int id);
}
