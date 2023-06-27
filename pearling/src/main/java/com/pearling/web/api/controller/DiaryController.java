package com.pearling.web.api.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
import com.pearling.web.entity.DiaryComment;
import com.pearling.web.entity.DiaryView;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.DiaryCommentService;
import com.pearling.web.service.DiaryService;

@RestController("apiDiaryController")
@RequestMapping("api/diary")
public class DiaryController {

	@Autowired
	private DiaryService service;

	@GetMapping("list")
	public List<Diary> list(
			@RequestParam(name = "s", required = false) boolean editShow) {

		return service.getList();
	}

	@GetMapping("{date}")
	public List<DiaryView> list(
			@RequestParam(name = "s", required = false) boolean editShow,
			@PathVariable("date") String date,
			@AuthenticationPrincipal MyUserDetails user) {

		Integer memberId = null;

		if (user != null) {
			memberId = user.getId();
		}

		List<DiaryView> list = null; 

		if (date == null) {
			// 오늘 날짜로 지정
			LocalDate today = LocalDate.now();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			date = today.format(formatter);
			list = service.getViewListByDate(date, memberId);
		} else {
			list = service.getViewListByDate(date, memberId);
		}

		return list;
	}

	@GetMapping("detail/{id}")
	public Diary list(@PathVariable("id") Integer id,
			@RequestParam(name = "s", required = false) boolean editShow) {

		Diary diary = service.findById(id);

		return diary;
	}

	@PostMapping
	public void post(@RequestBody DiaryRequest diaryRequest, @AuthenticationPrincipal MyUserDetails user) {
		Diary diary = Diary.builder()
				.date(diaryRequest.getDate())
				.title(diaryRequest.getTitle())
				.view(0)
				.content(diaryRequest.getContent())
				.memberId(user.getId()) // MyUserDetails 객체에서 id 값을 가져옵니다.
				.diaryScopeId(diaryRequest.getDiaryScopeId())
				.build();
		service.addDiary(diary);

		System.out.println("나는 레스트컨트롤러");
	}

	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") Integer id) {
		Diary diary = service.findById(id);
		if (diary != null) {
			service.deleteDiary(diary);
		}
	}

	@PutMapping("{id}")
	public void update(@PathVariable("id") Integer id,
			@RequestBody DiaryRequest diaryRequest) {
		Diary diary = Diary.builder()
				.id(id)
				.date(diaryRequest.getDate())
				.title(diaryRequest.getTitle())
				.content(diaryRequest.getContent())
				.diaryScopeId(diaryRequest.getDiaryScopeId())
				.build();
		service.updateDiary(diary);
	}

	// getter, setter

	public static class DiaryRequest {
		private LocalDate date;
		private String title;
		private String content;
		private Integer diaryScopeId;

		// Getters and setters

		public LocalDate getDate() {
			return date;
		}

		public void setDate(LocalDate date) {
			this.date = date;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getContent() {
			return content;
		}

		public void setContent(String content) {
			this.content = content;
		}

		public Integer getDiaryScopeId() {
			return diaryScopeId;
		}

		public void setDiaryScopeId(Integer diaryScopeId) {
			this.diaryScopeId = diaryScopeId;
		}
	}

}