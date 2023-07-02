package com.pearling.web.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pearling.web.entity.Diary;
import com.pearling.web.entity.DiaryComment;
import com.pearling.web.entity.DiaryView;
import com.pearling.web.entity.Member;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.DiaryCommentService;
import com.pearling.web.service.DiaryService;
import com.pearling.web.service.MemberService;

@Controller
@RequestMapping("diary")
public class DiaryController extends BaseController {
	@Autowired
	private DiaryService service;

	@Autowired
	private DiaryCommentService diaryCommentService;

	@Autowired
	private MemberService memberService;
		
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

			if (date == null) {
				// 오늘 날짜로 지정
				LocalDate today = LocalDate.now();
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
				date = today.format(formatter);
				list = service.getViewListByDate(date, memberId);
			} else {
				list = service.getViewListByDate(date, memberId);
			}

			// Member member = memberService.getById(userId);

			model.addAttribute("list", list);	
			// model.addAttribute("member", member);	
		
			return "diary/list";
		}

	@GetMapping("/list/{id}")
	public String getDiaryList(
			@RequestParam(name = "s", required = false) boolean editShow,
			@RequestParam(name = "d", required = false) String date,
			@PathVariable("id") int userId,
			@AuthenticationPrincipal MyUserDetails user,
			Model model) {

		model.addAttribute("headerShow", true);

		Member otherUser = memberService.getById(userId);

		Integer memberId = null;

		if(user != null) 
			memberId = user.getId();

		List<DiaryView> list = null; 
		// null로 초기화하는 이유는 list 객체에 어떤 데이터가 담겨있는 것을 방지하고,
		// 실제 데이터가 list에 담기게 하기 위함이다.

		if (date == null) {
			// 오늘 날짜로 지정
			LocalDate today = LocalDate.now();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			date = today.format(formatter);
			list = service.getViewListByDate(date, otherUser.getId());
		} else {
			list = service.getViewListByDate(date, otherUser.getId());
		}

		model.addAttribute("list", list);	
		// model.addAttribute("member", member);	
	
		return "diary/list";
	}
	

	@GetMapping("post")
	public String post(
			@RequestParam(name = "s", required = false) boolean editShow,
			@RequestParam(name = "id", required = false) Integer id,
			@RequestParam(name = "memberId", required = false) Integer memberId,
			@AuthenticationPrincipal MyUserDetails user,
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
		
		memberId = null;
		
		if(user != null) 
		memberId = user.getId();
		
		DiaryView diary = service.findByViewId(id, memberId);
		List<DiaryComment> diaryComment = diaryCommentService.getList(memberId, id);

		model.addAttribute("list", list);
		model.addAttribute("diary", diary);	
		model.addAttribute("diaryComment", diaryComment);	

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

		service.append(diary);

		System.out.println("diary 확인 : " + diary);

		return "redirect:list";
		
	}

	// @PostMapping("delete")
	public String post(
			@RequestParam(name = "id", required = false) Integer id,
			Model model) {

		if (id != null) {
			// DiaryView diary = service.findById(id);
			// if (diary != null) {
			// 	service.delete(diary);
			// }
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
			service.update(diary);
		}

		return "redirect:list";
	}
}
