package com.pearling.web.service;

import java.util.Date;
import java.util.List;

import com.pearling.web.entity.Diary;
import com.pearling.web.entity.DiaryLike;

public interface DiaryLikeService {
	int append(DiaryLike diaryLike);
	int delete(DiaryLike diaryLike);
	int getCountByDiary(int diaryId);
}
