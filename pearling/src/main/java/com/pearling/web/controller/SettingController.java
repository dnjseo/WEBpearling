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

		model.addAttribute("headerShow", false);

		return "setting/accountmanage";
	}
	
	@GetMapping("account-pwd")
	public String accountPwd(Model model) {

		model.addAttribute("headerShow", false);

		return "setting/account-pwd";
	}
	
	@GetMapping("calendar")
	public String calander(Model model) {

		model.addAttribute("headerShow", false);

		return "setting/calendar";
	}
	
	@GetMapping("calendar-category")
	public String calanderCategory(Model model) {

		model.addAttribute("headerShow", false);

		return "setting/calendar-category";
	}
	
	@GetMapping("delete")
	public String delete(Model model) {

		model.addAttribute("headerShow", false);

		return "setting/delete";
	}
	
	@GetMapping("follow-group")
	public String followGroup(Model model) {

		model.addAttribute("headerShow", false);

		return "setting/follow-group";
	}
	
	@GetMapping("follow-list")
	public String followList(Model model) {

		model.addAttribute("headerShow", false);

		return "setting/follow-list";
	}

	@GetMapping("profile")
	public String profile(Model model) {

		model.addAttribute("headerShow", false);

		return "setting/profile";
	}

}
