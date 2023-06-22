package com.pearling.web.api.controller;

import java.io.Console;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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


    @GetMapping("detail/{id}")
    public Schedule detail(
        @PathVariable("id") int id){

            Schedule schedule = service.get(id);

            return schedule;
    }

    @PutMapping
    public Schedule editSchedule(Schedule schedule) {

        service.updateSchedule(schedule);
        Schedule updatedSchedule = service.get(schedule.getId());
        
        return updatedSchedule;
    }


    @DeleteMapping
    public Schedule deleteSchedule(Schedule schedule){


        return null;
    }

    @PostMapping("post")
    public void addSchedule(@RequestBody ScheduleRequest scheduleRequest, @AuthenticationPrincipal MyUserDetails user){
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
    

    public static class ScheduleRequest{
        private LocalDate startDate;
        private LocalTime startTime;
        private LocalDate endDate;
        private LocalTime endTime;
        private String title;
        private String backgroundColor; 
        private Double latitude;
        private Double longitude;
    
        
        public LocalDate getStartDate() {
            return startDate;
        }
        public void setStartDate(LocalDate startDate) {
            this.startDate = startDate;
        }
        public LocalTime getStartTime() {
            return startTime;
        }
        public void setStartTime(LocalTime startTime) {
            this.startTime = startTime;
        }
        public LocalDate getEndDate() {
            return endDate;
        }
        public void setEndDate(LocalDate endDate) {
            this.endDate = endDate;
        }
        public LocalTime getEndTime() {
            return endTime;
        }
        public void setEndTime(LocalTime endTime) {
            this.endTime = endTime;
        }
        public String getTitle() {
            return title;
        }
        public void setTitle(String title) {
            this.title = title;
        }
        public String getBackgroundColor() {
            return backgroundColor;
        }
        public void setBackgroundColor(String backgroundColor) {
            this.backgroundColor = backgroundColor;
        }
        public Double getLatitude() {
            return latitude;
        }
        public void setLatitude(Double latitude) {
            this.latitude = latitude;
        }
        public Double getLongitude() {
            return longitude;
        }
        public void setLongitude(Double longitude) {
            this.longitude = longitude;
        }
    
        
    }

}//class end
