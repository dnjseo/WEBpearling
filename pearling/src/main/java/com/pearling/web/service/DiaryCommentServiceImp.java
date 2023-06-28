package com.pearling.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.DiaryComment;
import com.pearling.web.repository.DiaryCommentRepository;

@Service
public class DiaryCommentServiceImp implements DiaryCommentService {

    @Autowired
    private DiaryCommentRepository repository;

    @Override
    public void append(DiaryComment diaryComment) {
        repository.save(diaryComment);
    }

    @Override
    public void delete(Integer id) {
        repository.delete(id);
    }

    @Override
    public int getCountByDiary(Integer diaryId) {
        return repository.countByDiary(diaryId);
    }

    @Override
    public List<DiaryComment> getList(Integer memberId, Integer diaryId) {
        return repository.findAll(memberId, diaryId);
    }

    @Override
    public void update(DiaryComment diaryComment) {
        repository.update(diaryComment);
    }



}
