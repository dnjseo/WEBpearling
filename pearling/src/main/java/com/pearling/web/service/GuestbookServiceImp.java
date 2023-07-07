package com.pearling.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Guestbook;
import com.pearling.web.entity.GuestbookView;
import com.pearling.web.repository.GuestbookRepository;

@Service
public class GuestbookServiceImp implements GuestbookService{
    
    @Autowired
    private GuestbookRepository repository;

    @Override
    public List<Guestbook> getList() {
        List<Guestbook> list = repository.findAll();

        return list;
    }

     @Override
    public List<Guestbook> getGuestBookList(Integer toId) {
        return repository.findByAll(toId);
    }

    @Override
    public GuestbookView getGuestbookById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public void addGuestbook(Guestbook guestbook) {
        repository.addGuestbook(guestbook);
    }

    @Override
    public void updateGuestbook(Guestbook guestbook) {
        repository.updateGuestbook(guestbook);
    }

    // 삭제 기능
    @Override
    public void deleteGuestbook(Integer id) {
        repository.delete(id);
    }
}