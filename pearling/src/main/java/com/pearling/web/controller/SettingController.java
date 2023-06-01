package com.pearling.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("setting")
public class SettingController {
	
	@GetMapping("accountmanage")
	public String accountManage() {
		return "setting/accountmanage";
	}
	
	@GetMapping("account-pwd")
	public String accountPwd() {
		return "setting/account-pwd";
	}
	
	@GetMapping("calander")
	public String calander() {
		return "setting/calander";
	}
	
	@GetMapping("calander-category")
	public String calanderCategory() {
		return "setting/calander-category";
	}
	
	@GetMapping("delete")
	public String delete() {
		return "setting/delete";
	}
	
	@GetMapping("follow-group")
	public String followGroup() {
		return "setting/follow-group";
	}
	
	@GetMapping("follow-list")
	public String followList() {
		return "setting/follow-list";
	}

}
