package com.pearling.web.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.entity.FriendTag;
import com.pearling.web.entity.Member;
import com.pearling.web.entity.Schedule;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.FriendTagService;
import com.pearling.web.service.MemberService;

@RestController
@RequestMapping("api/friendtag")
public class FriendTagController {

    @Autowired
    FriendTagService service; 

    @GetMapping
    public List<FriendTag> friendtagList(
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();

        int userId = userDetails.getId();
        List<FriendTag> friendList = new ArrayList<>();

        return friendList;
    }

    @PostMapping
    public void firendTagPost(
            @AuthenticationPrincipal MyUserDetails user,
            @RequestBody Map<String, Object> requestData) {
                
        String scheduleIdString = (String)requestData.get("scheduleId");
        Integer scheduleId = Integer.parseInt(scheduleIdString);
        System.out.println("scheduleId:::"+scheduleId);
        List<String> tagDataStringList = (List<String>) requestData.get("tagData");
        List<Integer> tagDataList = tagDataStringList.stream().map(Integer::parseInt).collect(Collectors.toList());

        for (Integer friendId : tagDataList) {
            FriendTag friendTag = FriendTag.builder()
                    .memberId(user.getId())
                    .scheduleId(scheduleId)
                    .friendId(friendId)
                    .build();
            service.append(friendTag);
        }

    }


    @DeleteMapping
    public void deleteFriendtag(
         @RequestBody Map<String, Object> requestData ) {

        String scheduleIdString = (String)requestData.get("id");
        Integer scheduleId = Integer.parseInt(scheduleIdString);

        List<String> friendNicknames = (List<String>) requestData.get("value");
        for (String nickname : friendNicknames){
            FriendTag tag = service.getByNickname(scheduleId, nickname);
            service.delete(tag);
        }
    }
}
