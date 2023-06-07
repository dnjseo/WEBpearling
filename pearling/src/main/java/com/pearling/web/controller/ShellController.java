package com.pearling.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("shell")
public class ShellController extends BaseController {
	
	@GetMapping("myshell")
	public String myShell(Model model) {

		model.addAttribute("headerShow", true);

		return "shell/myshell";
	}
	

	@GetMapping("ourshell")
	public String ourShell(Model model) {

		model.addAttribute("headerShow", true);

		return "shell/ourshell";
	}

	@GetMapping("others-shell")
	public String othersShell(Model model) {

		model.addAttribute("headerShow", true);

		return "shell/others-shell";
	}


}
