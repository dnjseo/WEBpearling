package com.pearling.web.api.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
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
import com.pearling.web.entity.DiaryView;
import com.pearling.web.entity.Member;
import com.pearling.web.entity.Schedule;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.DiaryService;
import com.pearling.web.service.MemberService;

@RestController("apiDiaryController")
@RequestMapping("api/diary")
public class DiaryController {

	@Autowired
	private DiaryService service;

	@Autowired
	private MemberService memberService;


	@GetMapping
	public List <Diary> diaryListforMyCalendar(
		@RequestParam(name = "uid", required = false) Integer uid,
		@AuthenticationPrincipal MyUserDetails user
		){

			if(uid == null){
			Integer	userId = user.getId();
			List<Diary> diaryList = service.getListByUserId(userId);
			
			return diaryList;
			} else {
			System.out.println("uid 확인:::" +uid);
			List<Diary> diaryList = service.getListByUserId(uid);

			return diaryList;
			}
		}
		


	@GetMapping("uid")
	public List<Diary> diaryListforCalendar(
	@RequestParam(name = "uid", required = false) Integer uid
	) {

		System.out.println("uid 확인:::" +uid);
		List<Diary> diaryList = service.getListByUserId(uid);

		return diaryList;
	}		

	@GetMapping("list")
	public List<Diary> list(
			@RequestParam(name = "s", required = false) boolean editShow) {

		return service.getList();
	}

	/* @GetMapping("{date}")
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
	*/


	@GetMapping("{date}/{id}")
	public List<DiaryView> list(
			@RequestParam(name = "s", required = false) boolean editShow,
			@RequestParam(name = "uid", required = false) Integer userId,
			@PathVariable("date") String date,
			@PathVariable("id") Integer memberId,
			@AuthenticationPrincipal MyUserDetails user) {

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
	public DiaryView list(@PathVariable("id") Integer id,
			@AuthenticationPrincipal MyUserDetails user,
			@RequestParam(name = "s", required = false) boolean editShow) {

		Integer memberId = null;
		
		if(user != null) 
		memberId = user.getId();

		DiaryView diary = service.findByViewId(id, memberId);

		return diary;
	}

	@PostMapping(consumes = "application/json", produces = "application/json")
	public void post(@RequestBody Diary diary) {
		
		service.append(diary);
		System.out.println("나는 diary-post 레스트컨트롤러");
	}

	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") Integer id) {
		Diary diary = service.findById(id);
		if (diary != null) {
			service.delete(diary);
		}

		System.out.println("나는 diary-delete 레스트컨트롤러");
	}

	@PutMapping("{id}")
	public void update(@PathVariable("id") Integer id,
			@RequestBody Diary diary) {

		service.update(diary);
		System.out.println("나는 diary-put 레스트컨트롤러" + diary);

	}

}