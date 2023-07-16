package com.pearling.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pearling.web.entity.Qa;
import com.pearling.web.service.QaService;

@Controller
@RequestMapping("qa")
public class QaController extends BaseController {

	@Autowired
	private QaService service;

	//페이징 처리
	int pageSize = 10;

	@GetMapping("list")
	public String list(
			@RequestParam(name = "s", required = false) boolean editShow,
			@RequestParam(name = "p", defaultValue = "1") int page,
			@RequestParam(name = "q", required = false) String query,
			Model model) {

		// if (editShow)
		// model.addAttribute("editShow", 1);
		// else
		// model.addAttribute("editShow", 2);
		
		// int totalCount = service.count();
		// int totalPages = (int) Math.ceil((double) totalCount / pageSize);

		// if (page < 1 || page > totalPages) 
		// 	page = 1;
		
		List<Qa> list = null;
		String searchResult = "";
		
		if(query == null)
		list = service.getList();
		else{
			list = service.getListByQuery(query);
			searchResult = query;
		}
		
		model.addAttribute("list", list);
		model.addAttribute("searchResult", searchResult);
		// model.addAttribute("totalPages", totalPages);
		// model.addAttribute("currentPage", page);
		
		model.addAttribute("headerShow", true);

		System.out.println(list);

		return "qa/list";
    }

	@GetMapping("post")
	public String post(
			@RequestParam(name = "s", required = false) boolean editShow,
			Model model) {

		String pageTitle = getPageTitle();
		pageTitle = "문의하기";

		model.addAttribute("pageTitle", pageTitle);

		if(editShow) {
			model.addAttribute("headerShow", false);
			model.addAttribute("editShow", 1);
		} else {
			model.addAttribute("headerShow", false);
			model.addAttribute("editShow", 2);
		}
		return "qa/post";
	}

	@GetMapping("detail")
	public String detail(Model model, @RequestParam Integer id){

		String pageTitle = getPageTitle();
		pageTitle = "문의하기";

		model.addAttribute("pageTitle", pageTitle);
		model.addAttribute("headerShow", false);
		
		Qa qa = service.findById(id);
		model.addAttribute("qa", qa);

		return "qa/detail";
	}

}
