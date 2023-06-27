package com.pearling.web.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Diary;
import com.pearling.web.entity.DiaryComment;
import com.pearling.web.entity.DiaryLike;
import com.pearling.web.repository.DiaryCommentRepository;
import com.pearling.web.repository.DiaryLikeRepository;
import com.pearling.web.repository.DiaryRepository;

@Service
public class DiaryCommentServiceImp implements DiaryCommentService {

    @Autowired
    private DiaryCommentRepository repository;

    @Override
    public int append(DiaryComment diaryComment) {
        return repository.save(diaryComment);
    }

    @Override
    public int delete(DiaryComment diaryComment) {
        return repository.delete(diaryComment);
    }

    @Override
    public int getCountByDiary(Integer diaryId) {
        return repository.countByDiary(diaryId);
    }

    @Override
    public List<DiaryComment> getList(Integer memberId, Integer diaryId) {
        return repository.findAll(memberId, diaryId);
    }



}
