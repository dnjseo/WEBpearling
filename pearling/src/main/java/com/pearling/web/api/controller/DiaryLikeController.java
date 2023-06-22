package com.pearling.web.api.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.entity.Diary;
import com.pearling.web.entity.DiaryLike;
import com.pearling.web.entity.DiaryView;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.DiaryLikeService;
import com.pearling.web.service.DiaryService;

@RestController("apiDiaryLikeController")
@RequestMapping("api/diarylikes")
public class DiaryLikeController {

	@Autowired
	private DiaryLikeService service;

	// @PostMapping
	// public int add(DiaryLike DiaryLike) {
	// return service.append(DiaryLike);
	// }

	@GetMapping("count")
	public int count(@RequestParam("dr") int diaryId) {

		int result = service.getCountByDiary(diaryId);

		return result;
	}

	@PostMapping
	public int add(
			@RequestParam("dr") int diaryId,
			@RequestParam("mb") int memberId) {

		DiaryLike diaryLike = DiaryLike.builder()
				.diaryId(diaryId)
				.memberId(memberId)
				.build();

		return service.append(diaryLike);
	}

	@DeleteMapping("{diaryId}/members/{memberId}")
	public int delete(@PathVariable("diaryId") int diaryId,
			@PathVariable("memberId") int memberId) {

		DiaryLike diaryLike = DiaryLike.builder()
				.diaryId(diaryId)
				.memberId(memberId)
				.build();

		return service.delete(diaryLike);
	}

}