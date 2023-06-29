package com.pearling.web.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.service.GuestbookService;

@RestController("apiGuestbookController")
@RequestMapping("api/guestbook")
public class GuestbookController {
   
    @Autowired
    private GuestbookService service;

   @DeleteMapping("delete/{id}") // 삭제 기능 추가
   public void delete(@PathVariable("id") int id) {
      service.deleteGuestbook(id);
      System.out.println("삭제되었습니다!!");
   }
}