package com.pearling.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Guestbook;
import com.pearling.web.repository.GuestbookRepository;

@Service
public class GuestbookServiceImp implements GuestbookService{
    
    @Autowired
    private GuestbookRepository repository;

     @Override
    public List<Guestbook> getGuestBookList(Integer toId) {
        return repository.findByAll(toId);
    }

    @Override
    public void addGuestbook(Guestbook guestbook) {
    }

    @Override
    public void updateGuestbook(Guestbook guestbook) {
    }

    // 삭제 기능
    @Override
    public void deleteGuestbook(int id) {
        repository.delete(id);
    }
}