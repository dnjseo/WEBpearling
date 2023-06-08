package com.pearling.web.controller;

import org.springframework.stereotype.Controller;

@Controller
public class BaseController {
	
    public boolean headerShow() {
		return true;
	}

	public boolean editShow() {
		return true;
	}

	public boolean friendShow() {
		return true;
	}
	
}
