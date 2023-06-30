package com.pearling.web.controller;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pearling.web.entity.Guestbook;
import com.pearling.web.entity.Member;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.GuestbookService;
import com.pearling.web.service.MemberService;

@Controller
@RequestMapping("guestbook")
public class GuestbookController extends BaseController {
   Random random = new Random();

   @Autowired
   private MemberService memberService;

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

   @GetMapping("list/{id}")
   public String otherlist(@PathVariable("id") int userId,
                     Model model) {
                        
      model.addAttribute("headerShow", true);
      Member otherUser = memberService.getById(userId);

      List<Guestbook> list = service.getGuestBookList(otherUser.getId());
      model.addAttribute("list", list);

      return "guestbook/list";
   }
}