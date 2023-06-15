package com.pearling.web.controller;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pearling.web.entity.Diary;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.DiaryService;

@Controller
@RequestMapping("diary")
public class DiaryController extends BaseController {
	@Autowired
	private DiaryService service;

	@GetMapping("list")
	public String list(
			@RequestParam(name = "s", required = false) boolean editShow,
			Model model) {

		// if (editShow)
		// model.addAttribute("editShow", 1);
		// else
		// model.addAttribute("editShow", 2);

		model.addAttribute("headerShow", true);
		List<Diary> list = service.getList();
		model.addAttribute("list", list);

		return "diary/list";
	}

	@GetMapping("post")
	public String post(
			@RequestParam(name = "s", required = false) boolean editShow,
			@RequestParam(name = "id", required = false) Integer id,
			Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "";

		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);

		if (editShow)
			model.addAttribute("editShow", 1);
		else
			model.addAttribute("editShow", 2);

		List<Diary> list = service.getList();

		Diary diary = service.findById(id);

		model.addAttribute("list", list);
		model.addAttribute("diary", diary);

		return "diary/post";
	}

	@PostMapping("post")
	public String post(
			@RequestParam(name = "date", required = false) LocalDate date,
			@RequestParam(name = "title", required = false) String title,
			@RequestParam(name = "view", required = false) Integer view,
			@RequestParam(name = "content", required = false) String content,
			@RequestParam(name = "memberId", required = false) Integer memberId,
			@RequestParam(name = "diaryScopeId", required = false) Integer diaryScopeId,
			Model model, MyUserDetails user) {

		System.out.println("여러분 userId는 이것입니다! ::::: " + user.getId());

		user.getId();
		Diary diary = Diary.builder()
				.date(date)
				.title(title)
				.view(0)
				.content(content)
				.memberId(4)
				.diaryScopeId(diaryScopeId)
				.build();

		service.addDiary(diary);

		System.out.println("diary 확인 : " + diary);

		return "redirect:list";
	}

	@PostMapping("delete")
	public String post(
			@RequestParam(name = "id", required = false) Integer id,
			Model model) {

		if (id != null) {
			Diary diary = service.findById(id);
			if (diary != null) {
				service.deleteDiary(diary);
			}
		}

		return "redirect:list";
	}

	@PostMapping("update")
	public String update(
			@RequestParam(name = "id", required = false) Integer id,
			@RequestParam(name = "date", required = false) LocalDate date,
			@RequestParam(name = "title", required = false) String title,
			@RequestParam(name = "content", required = false) String content,
			@RequestParam(name = "diaryScopeId", required = false) Integer diaryScopeId,
			Model model, MyUserDetails user) {

		Diary diary = Diary.builder()
				.date(date)
				.title(title)
				.content(content)
				.diaryScopeId(diaryScopeId)
				.build();

		if (id != null) {
			diary.setId(id);
			service.updateDiary(diary);
		}

		return "redirect:list";
	}
}
