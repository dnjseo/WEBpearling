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
import org.springframework.web.bind.annotation.RequestParam;

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

   @GetMapping("/list")
   public String list(@RequestParam(name = "uid", required = false) Integer userId,
                     @AuthenticationPrincipal MyUserDetails user,
                     Model model) {

      model.addAttribute("headerShow", true);

      Integer toId = null;

      if(user != null)
         toId = user.getId();

      List<Guestbook> list = service.getGuestBookList(toId);
      model.addAttribute("list", list);
      
      return "guestbook/list";
   }

   @GetMapping("/list/{id}")
   public String otherlist(@PathVariable("id") int userId,
                           @AuthenticationPrincipal MyUserDetails user,
                           Model model) {
                     
      model.addAttribute("headerShow", true);
      Member otherUser = memberService.getById(userId);

      Integer memberId = null;
      Integer loginId = null;

      if (user != null) {
         memberId = user.getId();
         loginId = user.getId();
      }

      List<Guestbook> list = service.getGuestBookList(otherUser.getId());
      model.addAttribute("list", list);
      model.addAttribute("userId", userId);
      model.addAttribute("loginId", loginId);

      return "guestbook/list";
   }

   @GetMapping("post/{id}")
   public String post(
         @PathVariable("id") int userId,
         @RequestParam(name = "s", required = false) boolean editShow,
         @AuthenticationPrincipal MyUserDetails user,
         Model model) {

      String pageTitle = getPageTitle();
      pageTitle = "방명록 입력";

      model.addAttribute("pageTitle", pageTitle);
      model.addAttribute("headerShow", false);
      model.addAttribute("userId", userId);

      if (editShow)
         model.addAttribute("editShow", 1);
      else
         model.addAttribute("editShow", 2);

      return "guestbook/post";
   }


}