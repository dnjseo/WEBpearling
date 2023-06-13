package com.pearling.web.controller;

import org.springframework.stereotype.Controller;

@Controller
public class BaseController {
	
    protected boolean headerShow() {
		return true;
	}

	private int editShow = 1;

	private boolean friendShow() {
		return true;
	}

	private String pageTitle;

	public String getPageTitle() {
		return this.pageTitle;
	}

	public void setPageTitle(String pageTitle) {
		this.pageTitle = pageTitle;
	}
	
}
