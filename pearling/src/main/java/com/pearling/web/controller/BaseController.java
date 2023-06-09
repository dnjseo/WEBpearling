package com.pearling.web.controller;

import org.springframework.stereotype.Controller;

@Controller
public class BaseController {
	
    private boolean headerShow() {
		return true;
	}

	private int editShow = 1;

	private boolean friendShow() {
		return true;
	}
	
}
