package com.pearling.web.service;

import java.util.List;

import com.pearling.web.entity.Guestbook;

public interface GuestbookService {
    List<Guestbook> getList();
    int count();
}
