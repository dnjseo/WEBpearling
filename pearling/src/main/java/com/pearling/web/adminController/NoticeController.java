package com.pearling.web.adminController;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pearling.web.controller.BaseController;

@Controller("adminNoticeController")
@RequestMapping("admin/notice")
public class NoticeController extends BaseController {
    

    @GetMapping("post")
	public String post(Model model){
		String pageTitle = getPageTitle();
		pageTitle = "공지사항";

		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);

		return "admin/notice/post";
	}
}
