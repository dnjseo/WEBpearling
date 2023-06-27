package com.pearling.web.service;

import java.util.Date;
import java.util.List;

import com.pearling.web.entity.Diary;
import com.pearling.web.entity.DiaryComment;

public interface DiaryCommentService {
	List<DiaryComment> getList(Integer memberId, Integer diaryId);
	int append(DiaryComment diaryComment);
	int delete(DiaryComment diaryComment);
	int getCountByDiary(Integer diaryId);
}
