package com.pearling.web.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.entity.Guestbook;
import com.pearling.web.service.GuestbookService;

@RestController("apiGuestbookController")
@RequestMapping("api/guestbook")
public class GuestbookController {
   
    @Autowired
    private GuestbookService service;

    @GetMapping("list")
	public List<Guestbook> list() {

		return service.getList();
	}

    @GetMapping("{id}")
    public Guestbook list(@PathVariable("id") Integer id){

        Guestbook guestbook = service.findById(id);
        return guestbook;
    }
}