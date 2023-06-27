package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.pearling.web.entity.DiaryComment;

@Mapper
public interface DiaryCommentRepository {
    List<DiaryComment> findAll(Integer memberId, Integer diaryId);
    DiaryComment findById(Integer memberId, Integer diaryId);
    int save(DiaryComment diaryComment);
    int delete(DiaryComment diaryComment);
    int countByDiary(int diaryId);
}