package com.pearling.web.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.entity.FriendTag;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.FriendTagService;

@RestController
@RequestMapping("api/friendtag")
public class FriendTagController {

    @Autowired
    FriendTagService service;

    @GetMapping
    public List<FriendTag> friendtagList(

    ){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();

        int userId = userDetails.getId();
        List<FriendTag> friendList = new ArrayList<>();

        return friendList;
    }  
}

