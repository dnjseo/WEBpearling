package com.pearling.web.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.entity.Follow;
import com.pearling.web.entity.Member;
import com.pearling.web.repository.FollowRepository;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.FollowService;

@RestController("apiFollowController")
@RequestMapping("api/follow")
public class FollowController {
    
    @Autowired
    FollowService service;

    @GetMapping("followingList")

    public List<Member> followingList(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails user = (MyUserDetails) authentication.getPrincipal();
        int memberId = user.getId();
        
        List<Member> followingList = service.getFollowingsList(memberId);

        return followingList;
    }

    @GetMapping("followerList")
    public List<Member> followerList(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails user = (MyUserDetails) authentication.getPrincipal();
        int memberId = user.getId();
        
        List<Member> followerList = service.getFollowersList(memberId);

        return followerList;
    }

    @PostMapping("followingList/{id}")
    public void addFollow(  @PathVariable("id") int id,
                            @RequestBody FollowRequest followRequest, 
                            @AuthenticationPrincipal MyUserDetails user){
        Follow follow = Follow.builder()
                        .followerId(followRequest.getFollowerId())
                        .followingId(user.getId())
                        .build();
        service.addFollow(follow);
    }

    @DeleteMapping("followingList/{id}")
    public void deleteFollowing(@PathVariable("id") int id){
        
        Follow follow = service.findById(id);
        if(follow != null){
            service.deleteFollow(follow);
        }
    }

    @DeleteMapping("followerList/{id}")
     public void deleteFollower(@PathVariable("id") int id){
        
        Follow follow = service.findById(id);
        if(follow != null){
            service.deleteFollow(follow);
        }
    }








    // getter, setter

    public static class FollowRequest{
        private int followerId;

        public int getFollowerId() {
            return followerId;
        }

        public void setFollowerId(int followerId) {
            this.followerId = followerId;
        }
        
    }



    






}