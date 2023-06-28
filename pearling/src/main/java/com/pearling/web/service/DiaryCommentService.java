package com.pearling.web.service;

import java.util.Date;
import java.util.List;

import com.pearling.web.entity.Diary;
import com.pearling.web.entity.DiaryComment;

public interface DiaryCommentService {
	List<DiaryComment> getList(Integer memberId, Integer diaryId);
	void append(DiaryComment diaryComment);
	void delete(Integer id);
	int getCountByDiary(Integer diaryId);
    void update(DiaryComment diaryComment);
}
