package com.pearling.web.api.controller;

import java.io.Console;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.entity.Diary;
import com.pearling.web.entity.FriendTag;
import com.pearling.web.entity.Schedule;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.FriendTagService;
import com.pearling.web.service.ScheduleService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController("apiScheduleController")
@RequestMapping("api/schedules")
public class ScheduleController{

    @Autowired
    private ScheduleService service;

    @Autowired
    private FriendTagService tagService;

    @GetMapping
    public List<Schedule> scheduleList (){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();

        int userId = userDetails.getId();
        String userNickname = userDetails.getNickname();

        List<Schedule> scheduleList = new ArrayList<>();

        scheduleList = service.getListByUserId(userId);
        //System.out.println(scheduleList);

        return scheduleList;
    }

    @GetMapping("/{id}")
    public List<Schedule> scheduleList(@PathVariable("id") int userId) {
        List<Schedule> scheduleList = service.getListByUserId(userId);
        return scheduleList;
    }

    @GetMapping("ourshell/{id}")
    public List<Schedule> friendScheduleList(
        @PathVariable("id") int userId,
        @RequestParam("date") LocalDate date) {

        List<Schedule> scheduleList = service.getListByDate(userId, date);
        return scheduleList;
    }

    @GetMapping("detail")
    public Schedule detail(@RequestParam("id") int id){

            Schedule s = service.get(id);

            return s;
    }

    @PutMapping("detail")
    public Schedule editSchedule(@RequestParam("id") int id,
			@RequestBody Schedule schedule) {

        service.updateSchedule(schedule);
        Schedule updatedSchedule = service.get(schedule.getId());
        
        return updatedSchedule;
    }


    @DeleteMapping("{id}")
    @PreAuthorize("@scheduleSecurity.checkOwnership(#id, authentication.principal.id)")
    public ResponseEntity<?>  deleteSchedule
    (@PathVariable("id") Integer id){

        Schedule schedule = service.findById(id);

            if (schedule != null) {
          int deletedRows = service.deleteSchedule(schedule);
          if (deletedRows > 0) {
              return ResponseEntity.ok().build(); // 성공적으로 삭제된 경우 200 OK 반환
          }
      }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public void addSchedule(@RequestBody Map<String, Object> requestData,
        @AuthenticationPrincipal MyUserDetails user){
            
        Map<String, Object> scheduleRequest = (HashMap) requestData.get("scheduleData");

        String startDateString = (String)scheduleRequest.get("startDate");
        LocalDate startDate = LocalDate.parse(startDateString);
        String endDateString = (String)scheduleRequest.get("endDate");
        LocalDate endDate = LocalDate.parse(endDateString);

        String startTimeString = (String)scheduleRequest.get("startTime");
        LocalTime startTime = startTimeString != "" ? LocalTime.parse(startTimeString) : null;
        String endTimeString = (String) scheduleRequest.get("endTime");
        LocalTime endTime = endTimeString != "" ? LocalTime.parse(endTimeString) : null;
       
        String latitudeString = (String) scheduleRequest.get("latitude");
        Double latitude = latitudeString != "" ? Double.parseDouble(latitudeString) : null;

        String longitudeString = (String) scheduleRequest.get("longitude");
        Double longitude = longitudeString != "" ? Double.parseDouble(longitudeString) : null;

        Schedule schedule = Schedule.builder()
				.startDate(startDate)
				.startTime(startTime)
				.endDate(endDate)
				.endTime(endTime)
				.title((String)scheduleRequest.get("title"))
				.memberId(user.getId())
				.backgroundColor((String)scheduleRequest.get("backgroundColor"))
				.latitude(latitude)
				.longitude(longitude)
                .place((String)scheduleRequest.get("place"))
				.build();

    int rtScheduleId = service.addSchedule(schedule);

    System.out.println("rtScheduleId입니다:::::::"+rtScheduleId);
    List<String> tagDataStringList = (List<String>) requestData.get("tagData");
    List<Integer> tagDataList = tagDataStringList.stream().map(Integer::parseInt).collect(Collectors.toList());

    System.out.println("태그데이터를 꺼냇읍니다:::::::"+tagDataList);
    
        if(!tagDataList.isEmpty()){
            for (Integer friendId : tagDataList) {    
                FriendTag friendTag = FriendTag.builder()
                    .memberId(user.getId())
                    .scheduleId(rtScheduleId)
                    .friendId(friendId)
                    .build();
                tagService.append(friendTag);
            }
        }
    }    


}//class end
