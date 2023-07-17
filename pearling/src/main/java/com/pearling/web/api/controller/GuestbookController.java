package com.pearling.web.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.entity.Guestbook;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.GuestbookService;

@RestController("apiGuestbookController")
@RequestMapping("api/guestbook")
public class GuestbookController {

   @Autowired
   private GuestbookService service;

   @PostMapping("add/{id}") // 추가 기능 추가
   public void add(@RequestBody Guestbook guestbook,
         @AuthenticationPrincipal MyUserDetails user,
         @PathVariable("id") int userId) {

      Integer fromId = user.getId(); // 현재 사용자의 ID를 fromId로 지정
      Integer toId = guestbook.getToId(); // 전송된 toId 사용

      guestbook.setFromId(fromId); // Guestbook 객체에 fromId 설정
      guestbook.setToId(toId); // Guestbook 객체에 toId 설정

      service.add(guestbook);
   }

   @PutMapping("update/{id}")
   public void update(@PathVariable("id") int id, @RequestBody Guestbook guestbook) {
      guestbook.setId(id);
      System.out.println("엥.. 대체 왜 수정이 안되는거임 ? ");
      service.update(guestbook);
   }

   @DeleteMapping("delete/{id}") // 삭제 기능 추가
   public void delete(@PathVariable("id") int id) {
      service.delete(id);
   }
}