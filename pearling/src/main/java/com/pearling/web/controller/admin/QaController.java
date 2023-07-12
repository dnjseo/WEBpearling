package com.pearling.web.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pearling.web.controller.BaseController;
import com.pearling.web.entity.Qa;
import com.pearling.web.service.QaService;

@Controller("adminQaController")
@RequestMapping("admin/qa")
public class QaController extends BaseController {
    
    @Autowired
    private QaService service;

@GetMapping("list")
	public String list(
			@RequestParam(name = "s", required = false) boolean editShow,
			Model model) {

		// if (editShow)
		// model.addAttribute("editShow", 1);
		// else
		// model.addAttribute("editShow", 2);

		model.addAttribute("headerShow", true);
		List<Qa> list = service.getList();
		model.addAttribute("list", list);

		System.out.println(list);

		return "admin/qa/list";
    }
}
