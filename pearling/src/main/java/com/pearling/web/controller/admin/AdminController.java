package com.pearling.web.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pearling.web.controller.BaseController;
import com.pearling.web.entity.Diary;
import com.pearling.web.entity.Guestbook;
import com.pearling.web.entity.Member;
import com.pearling.web.entity.Schedule;
import com.pearling.web.service.DiaryService;
import com.pearling.web.service.GuestbookService;
import com.pearling.web.service.MemberService;
import com.pearling.web.service.ScheduleService;
import com.pearling.web.service.TodoService;

@Controller("")
@RequestMapping("/admin")
public class AdminController extends BaseController {

	@Autowired
	private MemberService memberService;

	@Autowired
	private TodoService todoService;

	@Autowired
	private ScheduleService scheduleService;

	@Autowired
	private DiaryService diaryService;

	@Autowired
	private GuestbookService guestbookService;

	// 페이징 처리
	int pageSize = 20; // 페이지당 이미지 개수
	int totalCount;
	int totalPages;

	// 인덱스
	@GetMapping("/index")
	public String list(Model model) {

		int totalMembers = memberService.allCount();
		int totalTodoPosts = todoService.allCount();
		int totalSchedulePosts = scheduleService.allCount();
		int totalDiaryPosts = diaryService.allCount();
		int totalGuestbookPosts = guestbookService.allCount();

		model.addAttribute("totalMembers", totalMembers);
		model.addAttribute("totalTodoPosts", totalTodoPosts);
		model.addAttribute("totalSchedulePosts", totalSchedulePosts);
		model.addAttribute("totalDiaryPosts", totalDiaryPosts);
		model.addAttribute("totalGuestbookPosts", totalGuestbookPosts);

		return "admin/index";
	}

	// 회원 관리
	@GetMapping("/member/admin-member")
	public String mlist(
			@RequestParam(name = "page", defaultValue = "1") int page,
			@RequestParam(name = "query", required = false) String query,
			Model model) {

		if (query != null && !query.isEmpty()) {
			totalCount = memberService.getTotalCountWithQuery(query);
		} else {
			totalCount = memberService.allCount();
		}

		totalPages = (int) Math.ceil((double) totalCount / pageSize);

		if (page < 1 || page > totalPages)
			page = 1;

		int offset = (page - 1) * pageSize;
		List<Member> list;

		if (query != null && !query.isEmpty()) {
			list = memberService.getList(offset, pageSize, query);
		} else {
			list = memberService.getList(offset, pageSize);
		}

		model.addAttribute("list", list);
		model.addAttribute("totalPages", totalPages);
		model.addAttribute("currentPage", page);
		model.addAttribute("query", query);

		return "admin/member/admin-member";
	}

	// 일정 관리
	@GetMapping("/board/admin-schedule")
	public String slist(
			@RequestParam(name = "page", defaultValue = "1") int page,
			@RequestParam(name = "query", required = false) String query,
			Model model) {

		if (query != null && !query.isEmpty()) {
			totalCount = scheduleService.getTotalCountWithQuery(query); // 검색어에 따른 전체 방명록 개수
		} else {
			totalCount = scheduleService.allCount(); // 전체 방명록 개수
		}

		totalPages = (int) Math.ceil((double) totalCount / pageSize); // 전체 페이지 수

		// 현재 페이지 번호가 유효한 범위를 벗어나는 경우 첫 페이지로 설정
		if (page < 1 || page > totalPages)
			page = 1;

		int offset = (page - 1) * pageSize; // 페이지 시작 위치(offset) 계산
		List<Schedule> list;

		if (query != null && !query.isEmpty()) {
			// 검색어가 있을 경우 검색 기능 적용
			list = scheduleService.getList(offset, pageSize, query);
		} else {
			list = scheduleService.getList(offset, pageSize);
		}

		for (Schedule schedule : list) {
			Member memberId = memberService.getById(schedule.getMemberId());
			schedule.setMemberNickname(memberId.getNickname());
		}

		model.addAttribute("list", list); // list 변수를 모델에 추가

		model.addAttribute("totalPages", totalPages);
		model.addAttribute("currentPage", page);
		model.addAttribute("query", query); // 검색어를 view로 전달

		return "admin/board/admin-schedule";
	}

	// 다이어리 관리
	@GetMapping("/board/admin-diary")
	public String dlist(
			@RequestParam(name = "page", defaultValue = "1") int page,
			@RequestParam(name = "query", required = false) String query,
			Model model) {

		if (query != null && !query.isEmpty()) {
			totalCount = diaryService.getTotalCountWithQuery(query); // 검색어에 따른 전체 방명록 개수
		} else {
			totalCount = diaryService.allCount(); // 전체 방명록 개수
		}

		totalPages = (int) Math.ceil((double) totalCount / pageSize); // 전체 페이지 수

		// 현재 페이지 번호가 유효한 범위를 벗어나는 경우 첫 페이지로 설정
		if (page < 1 || page > totalPages)
			page = 1;

		int offset = (page - 1) * pageSize; // 페이지 시작 위치(offset) 계산
		List<Diary> list;

		if (query != null && !query.isEmpty()) {
			// 검색어가 있을 경우 검색 기능 적용
			list = diaryService.getList(offset, pageSize, query);
		} else {
			list = diaryService.getList(offset, pageSize);
		}

		for (Diary diary : list) {
			Member memberId = memberService.getById(diary.getMemberId());
			diary.setMemberNickname(memberId.getNickname());
		}

		model.addAttribute("list", list); // list 변수를 모델에 추가

		model.addAttribute("totalPages", totalPages);
		model.addAttribute("currentPage", page);
		model.addAttribute("query", query); // 검색어를 view로 전달

		return "admin/board/admin-diary";
	}

	// 방명록 관리
	@GetMapping("/board/admin-guestbook")
	public String glist(
			@RequestParam(name = "page", defaultValue = "1") int page,
			@RequestParam(name = "query", required = false) String query,
			Model model) {

		if (query != null && !query.isEmpty()) {
			totalCount = guestbookService.getTotalCountWithQuery(query); // 검색어에 따른 전체 방명록 개수
		} else {
			totalCount = guestbookService.allCount(); // 전체 방명록 개수
		}

		totalPages = (int) Math.ceil((double) totalCount / pageSize); // 전체 페이지 수

		// 현재 페이지 번호가 유효한 범위를 벗어나는 경우 첫 페이지로 설정
		if (page < 1 || page > totalPages)
			page = 1;

		int offset = (page - 1) * pageSize; // 페이지 시작 위치(offset) 계산
		List<Guestbook> list;

		if (query != null && !query.isEmpty()) {
			// 검색어가 있을 경우 검색 기능 적용
			list = guestbookService.getList(offset, pageSize, query);
		} else {
			list = guestbookService.getList(offset, pageSize);
		}

		for (Guestbook guestbook : list) {
			Member memberFromId = memberService.getById(guestbook.getFromId());
			Member memberToId = memberService.getById(guestbook.getToId());
			guestbook.setFromNickname(memberFromId.getNickname());
			guestbook.setToNickname(memberToId.getNickname());
		}

		model.addAttribute("list", list); // list 변수를 모델에 추가

		model.addAttribute("totalPages", totalPages);
		model.addAttribute("currentPage", page);
		model.addAttribute("query", query); // 검색어를 view로 전달

		return "admin/board/admin-guestbook";
	}
}