package com.pearling.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Guestbook;
import com.pearling.web.entity.GuestbookView;
import com.pearling.web.repository.GuestbookRepository;

@Service
public class GuestbookServiceImp implements GuestbookService {

    @Autowired
    private GuestbookRepository repository;

    @Override
    public List<Guestbook> getList(int offset, int pageSize) {
        return repository.findAll(offset, pageSize);
    }

    @Override
    public List<Guestbook> getList(int offset, int pageSize, String query) {
        return repository.findAllWithQuery(offset, pageSize, query);
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
    public void add(Guestbook guestbook) {
        repository.insert(guestbook);
    }

    @Override
    public void update(Guestbook guestbook) {
        repository.update(guestbook);
    }

    // 삭제 기능
    @Override
    public void delete(Integer id) {
        repository.delete(id);
    }

    @Override
    public int count(Integer toId) {
        return repository.count(toId);
    }

    @Override
    public int allCount() {
        return repository.allCount();
    }

    @Override
    public int getTotalCountWithQuery(String query) {
        return repository.getTotalCountWithQuery(query);
    }

}