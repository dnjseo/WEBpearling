package com.pearling.web.api.controller;

import java.io.Console;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import com.pearling.web.entity.Schedule;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.ScheduleService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController("apiScheduleController")
@RequestMapping("api/schedules")
public class ScheduleController{

    @Autowired
    private ScheduleService service;

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

    @GetMapping("detail")
    public Schedule detail(@RequestParam("id") int id){

            Schedule s = service.get(id);

            return s;
    }

    @PutMapping
    public Schedule editSchedule(Schedule schedule) {

        service.updateSchedule(schedule);
        Schedule updatedSchedule = service.get(schedule.getId());
        
        return updatedSchedule;
    }


    @DeleteMapping("{id}")
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

    @PostMapping("post")
    public void addSchedule(@RequestBody Schedule scheduleRequest, @AuthenticationPrincipal MyUserDetails user){
        Schedule schedule = Schedule.builder()
				.startDate(scheduleRequest.getStartDate())
				.startTime(scheduleRequest.getStartTime())
				.endDate(scheduleRequest.getEndDate())
				.endTime(scheduleRequest.getEndTime())
				.title(scheduleRequest.getTitle())
				.memberId(user.getId())
				.backgroundColor(scheduleRequest.getBackgroundColor())
				.latitude(scheduleRequest.getLatitude())
				.longitude(scheduleRequest.getLongitude())
				.build();
        service.addSchedule(schedule);
    }

    // @PostMapping(value="path")
    // public SomeEnityData postMethodName(@RequestBody SomeEnityData entity) {
    //     //TODO: process POST request
        
    //     return entity;
    // }
    

}//class end
