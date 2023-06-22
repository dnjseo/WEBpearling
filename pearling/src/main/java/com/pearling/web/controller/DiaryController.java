package com.pearling.web.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pearling.web.entity.Diary;
import com.pearling.web.entity.DiaryView;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.DiaryService;

@Controller
@RequestMapping("diary")
public class DiaryController extends BaseController {
	@Autowired
	private DiaryService service;
		
		@GetMapping("/list")
		public String getDiaryList(
				@RequestParam(name = "s", required = false) boolean editShow,
				@RequestParam(name = "d", required = false) String date,
				@AuthenticationPrincipal MyUserDetails user,
				Model model) {
	
			model.addAttribute("headerShow", true);

			Integer memberId = null;

			if(user != null) 
				memberId = user.getId();
			
			List<DiaryView> list = null; 
			// null로 초기화하는 이유는 list 객체에 어떤 데이터가 담겨있는 것을 방지하고,
			// 실제 데이터가 list에 담기게 하기 위함이다.
			list = service.getViewListByDate(date, memberId);
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

		System.out.println("나는 컨트롤러");
	

		return "diary/post";
	}

	// @PostMapping("post")
	public String post(
			@RequestParam(name = "date", required = false) LocalDate date,
			@RequestParam(name = "title", required = false) String title,
			@RequestParam(name = "view", required = false) Integer view,
			@RequestParam(name = "content", required = false) String content,
			@RequestParam(name = "memberId", required = false) Integer memberId,
			@RequestParam(name = "diaryScopeId", required = false) Integer diaryScopeId,
			Model model) {

		// user.getId();

		SecurityContext context = SecurityContextHolder.getContext();
		MyUserDetails user = (MyUserDetails) context.getAuthentication().getPrincipal();

		System.out.println("여러분 userId는 이것입니다! ::::: " + user.getId());

		Diary diary = Diary.builder()
				.date(date)
				.title(title)
				.view(0)
				.content(content)
				.memberId(user.getId())
				.diaryScopeId(diaryScopeId)
				.build();

		service.addDiary(diary);

		System.out.println("diary 확인 : " + diary);

		return "redirect:list";
		
	}

	// @PostMapping("delete")
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

	// @PostMapping("update")
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
