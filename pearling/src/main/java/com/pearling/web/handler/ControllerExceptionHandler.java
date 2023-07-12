package com.pearling.web.handler;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerExceptionHandler {
	
	@ExceptionHandler(Exception.class)
	public String error(Exception e) {
		
		System.err.println("에러 밣셍");
		
		return "";
	}
	
}
