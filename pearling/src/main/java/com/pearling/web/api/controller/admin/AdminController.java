package com.pearling.web.api.controller.admin;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.entity.Member;
import com.pearling.web.service.DiaryService;
import com.pearling.web.service.GuestbookService;
import com.pearling.web.service.MemberService;
import com.pearling.web.service.ScheduleService;

@RestController("apiAdminController")
@RequestMapping("api/admin")
public class AdminController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private DiaryService diaryService;

    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private GuestbookService guestbookService;

    // 회원삭제
    @DeleteMapping("membersList-delete")
    public void deleteMembers(@RequestBody Map<String, Object> requestData) {
        List<String> memberIds = (List<String>) requestData.get("value");
        List<Integer> membersIds = new ArrayList<>();

        for (String memberId : memberIds) {
        Integer id = Integer.parseInt(memberId);
        membersIds.add(id);
        }

        for (Integer memberId : membersIds) {
            Member member = memberService.getById(memberId);
            memberService.delete(member);
        }
    }

    // 스케줄 삭제
    @DeleteMapping("scheduleList-delete")
    public void deleteSchedule(@RequestBody Map<String, Object> requestData) {
        List<String> scheduleIds = (List<String>) requestData.get("value");
        List<Integer> ids = new ArrayList<>();

        for (String scheduleId : scheduleIds) {
            Integer id = Integer.parseInt(scheduleId);
            ids.add(id);
        }

        for (Integer scheduleId : ids) {
            scheduleService.delete(scheduleId);
        }
    }

    // 다이어리 삭제
    @DeleteMapping("diaryList-delete")
    public void deleteDiary(@RequestBody Map<String, Object> requestData) {
        List<String> diaryIds = (List<String>) requestData.get("value");
        List<Integer> ids = new ArrayList<>();

        for (String diaryId : diaryIds) {
            Integer id = Integer.parseInt(diaryId);
            ids.add(id);
        }

        for (Integer diaryId : ids) {
            diaryService.delete(diaryId);
        }
    }

    // 방명록 삭제
    @DeleteMapping("guestbook-delete")
    public void deleteGuestbook(@RequestBody Map<String, Object> requestData) {
        List<String> guestbookIds = (List<String>) requestData.get("value");
        List<Integer> ids = new ArrayList<>();

        for (String guestbookId : guestbookIds) {
            Integer id = Integer.parseInt(guestbookId);
            ids.add(id);
        }

        for (Integer guestbookId : ids) {
            guestbookService.delete(guestbookId);
        }
    }

}