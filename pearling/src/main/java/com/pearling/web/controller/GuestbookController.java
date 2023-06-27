package com.pearling.web.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pearling.web.entity.GuestBookView;
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

      List<GuestBookView> list = service.getGuestBookList(toId);

      List<String> imageUrls = Arrays.asList(
            "/images/guestbook/clam1.png",
            "/images/guestbook/clam2.png",
            "/images/guestbook/clam3.png");

      List<GuestBookView> guestbooks = new ArrayList<>();

      for (GuestBookView guestbookview : list) {
         guestbooks.add(new GuestBookView(
               guestbookview.getId(),
               guestbookview.getContent(),
               guestbookview.getRegdate(),
               guestbookview.getFromId(),
               imageUrls.get(random.nextInt(imageUrls.size())), 
               guestbookview.getToId()
         ));

         model.addAttribute("list", guestbooks);
      }
      return "guestbook/list";
   }

   @GetMapping("post")
   public String post(Model model) {
      model.addAttribute("headerShow", false);
      model.addAttribute("editShow", true);
      return "guestbook/post";
   }

   @PostMapping("delete/{id}") // 삭제 기능 추가
   public String delete(@PathVariable("id") int id) {
      service.deleteGuestbook(id);
      System.out.println("삭제되었습니다!!");
      return "redirect:/guestbook/list";
   }
}