package com.pearling.web.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pearling.web.entity.Search;
import com.pearling.web.service.SearchService;


@Controller
@RequestMapping("search")
public class SearchController extends BaseController {

	@Autowired
	private SearchService service;

	@GetMapping("list")
	public String list(
		@RequestParam(name = "q", required = false) String query,
		Model model) {
			
		List<Search> list = null;
		if(query == null)
			list = service.getList();
		else
			list = service.getListByQuery(query);
		
	
		model.addAttribute("headerShow", true);
		model.addAttribute("list", list);
		// model.addAttribute("userList", userList);

		return "search/list";
	}
	
}
