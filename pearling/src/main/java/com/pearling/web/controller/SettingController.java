package com.pearling.web.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pearling.web.entity.Member;
import com.pearling.web.entity.Schedule;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.MemberService;

@Controller
@RequestMapping("setting")
public class SettingController extends BaseController {

	@Autowired
    private MemberService service;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@GetMapping("accountmanage")
	public String accountManage(Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "계정 관리";

		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);

		return "setting/accountmanage";
	}
	
	// 비밀번호 관리
	@GetMapping("account-pwd")
	public String accountPwd(Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "비밀번호 변경";

		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);

		return "setting/account-pwd";
	}

	// 비밀번호 변경
	//@PostMapping("post")
	public String post(
			@RequestParam("currentPwd") String currentPwd,
			@RequestParam("newPwd") String newPwd,
			@RequestParam("confirmPwd") String confirmPwd,
			@AuthenticationPrincipal MyUserDetails user,
			Model model) {

		SecurityContext context = SecurityContextHolder.getContext();
		user = (MyUserDetails) context.getAuthentication().getPrincipal();

		Member member = Member.builder()
				.pwd(confirmPwd)
				.build();

		service.updatePwd(member);

		return "redirect:/shell/ourshell";
	}

	// 비밀번호 변경
    // @PostMapping("account-pwd")
    // public String accountPwdSubmit(@RequestParam("currentPwd") String currentPwd,
    //                                @RequestParam("newPwd") String newPwd,
    //                                @RequestParam("confirmPwd") String confirmPwd,
    //                                @AuthenticationPrincipal MyUserDetails user,
    //                                Model model) {

    //     Member existingMember = service.getByUsername(user.getUsername());

    //     // 비밀번호 변경 로직을 구현합니다.
    //     String encodedNewPwd = passwordEncoder.encode(newPwd);
    //     existingMember.setPwd(encodedNewPwd);
    //     service.updatePwd(existingMember);
    //     System.out.println("비밀번호 변경 구현중 !!");

    //     return "redirect:/shell/ourshell";
    // }
	
	@GetMapping("calendar")
	public String calander(Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "캘린더 설정";

		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);

		return "setting/calendar";
	}
	
	@GetMapping("calendar-category")
	public String calanderCategory(Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "카테고리 설정";

		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);

		return "setting/calendar-category";
	}
	
	@GetMapping("delete")
	public String delete(Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "계정 삭제";

		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);

		return "setting/delete";
	}
	
	@GetMapping("follow-group")
	public String followGroup(Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "친구 관리";

		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);

		return "setting/follow-group";
	}
	
	@GetMapping("follow-list")
	public String followList(Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "친구 관리";

		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);

		return "setting/follow-list";
	}

	@GetMapping("profile")
	public String profile(Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "프로필 수정";

		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);

		return "setting/profile";
	}

}
