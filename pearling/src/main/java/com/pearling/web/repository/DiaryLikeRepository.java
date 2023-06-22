package com.pearling.web.repository;

import org.apache.ibatis.annotations.Mapper;
import com.pearling.web.entity.DiaryLike;

@Mapper
public interface DiaryLikeRepository {
    DiaryLike findById(int memberId, int diaryId);
    int save(DiaryLike diaryLike);
    int delete(DiaryLike diaryLike);
    int countByDiary(int diaryId);
}