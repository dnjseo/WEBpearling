package com.pearling.web.controller;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pearling.web.entity.Guestbook;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.GuestbookService;

@Controller
@RequestMapping("guestbook")
public class GuestbookController extends BaseController {
   Random random = new Random();

   @Autowired
   private GuestbookService service;

   @GetMapping("list")
   public String list(@AuthenticationPrincipal MyUserDetails user,
                     Model model) {

      model.addAttribute("headerShow", true);
      Integer toId = null;
      if(user != null)
         toId = user.getId();
      List<Guestbook> list = service.getGuestBookList(toId);
      model.addAttribute("list", list);
      
      return "guestbook/list";
   }
}