package com.pearling.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController extends BaseController {
	// public boolean headerShow() {
	// 	return true;
	// }
	
	//@RequestMapping("/")
	public String index(Model model){

		model.addAttribute("headerShow", false);
		return "index";
	}
	
	// 로그인 매핑
	@GetMapping("/login")
	public String login(){
		return "login";
	}

	// @PostMapping("/login")
	// public String login(String email, String pwd, String returnURL, HttpSession session) {
	// System.out.println(email + pwd + returnURL);
	
	// if(!userService.isValid(email, pwd))
	// 	return "redirect:/sign-in?error";
	// post는 늘 안내페이지를 주어야 한다. 같은 페이지더라도 redirect 해주어야 한다. 
	
	// Member user = userService.getByEmail(email);
	// uid=username이 동일한 member 객체를 불러온다. 
	
	// 유효한 사용자로 입증되었다. 
	// session 저장소에 멤버의 아이디, 패스워드, 역할을 저장해준다. 
	// session.setAttribute("email", user.getEmail());
	// session.setAttribute("pwd", user.getPwd());
	
	// returnURL이 빈 문자열이 아니면, returnURL로 가고, 빈 문자열일 시 index 페이지로 간다. 
	// if(!returnURL.equals(""))
	// 	return "redirect:" + returnURL;
	// else
	// 	return "redirect:/index";
	// 	return "/shell/ourshell";
	// }

	@GetMapping("/find-password")
	public String findPassword(Model model){
		return "find-password";
	}

}