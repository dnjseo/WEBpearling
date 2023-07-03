package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.pearling.web.entity.DiaryComment;

@Mapper
public interface DiaryCommentRepository {
    List<DiaryComment> findAll(Integer diaryId);
    DiaryComment findById(Integer memberId, Integer diaryId);
    void save(DiaryComment diaryComment);
    void delete(Integer id);
    int countByDiary(int diaryId);
    void update(DiaryComment diaryComment);
}