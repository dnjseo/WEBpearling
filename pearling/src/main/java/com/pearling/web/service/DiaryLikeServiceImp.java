package com.pearling.web.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Diary;
import com.pearling.web.entity.DiaryLike;
import com.pearling.web.repository.DiaryLikeRepository;
import com.pearling.web.repository.DiaryRepository;

@Service
public class DiaryLikeServiceImp implements DiaryLikeService {

    @Autowired
    private DiaryLikeRepository repository;

    @Override
    public int append(DiaryLike diaryLike) {
        return repository.save(diaryLike);
    }

    @Override
    public int delete(DiaryLike diaryLike) {
        return repository.delete(diaryLike);
    }

    @Override
    public int getCountByDiary(int diaryId) {
        return repository.countByDiary(diaryId);
    }

}
