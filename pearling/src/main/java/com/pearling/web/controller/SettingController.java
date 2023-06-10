package com.pearling.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("setting")
public class SettingController extends BaseController {
	
	@GetMapping("accountmanage")
	public String accountManage(Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "계정 관리";

		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);

		return "setting/accountmanage";
	}
	
	@GetMapping("account-pwd")
	public String accountPwd(Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "비밀번호 변경";

		model.addAttribute("pageTitle", pageTitle);

		model.addAttribute("headerShow", false);

		return "setting/account-pwd";
	}
	
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
		pageTitle = "프로필 설정";

		model.addAttribute("pageTitle", pageTitle);

		model.addAttribute("headerShow", false);

		return "setting/profile";
	}

}
