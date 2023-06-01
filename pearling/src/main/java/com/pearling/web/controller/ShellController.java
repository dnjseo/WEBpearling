package com.pearling.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("shell")
public class ShellController {
	
	@GetMapping("myshell")
	public String myShell() {
		return "shell/myshell";
	}
	
	@GetMapping("ourshell")
	public String ourShell() {
		return "shell/ourshell";
	}

}
