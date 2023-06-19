package com.pearling.web.api.controller;

import java.io.Console;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
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


    @GetMapping("{id}")
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

    @PostMapping
    public Schedule addSchedule(Schedule schedule){

        int affected = service.addSchedule(schedule);
        Schedule newSchedule = service.get(affected);

        return newSchedule;
    }

    // @PostMapping(value="path")
    // public SomeEnityData postMethodName(@RequestBody SomeEnityData entity) {
    //     //TODO: process POST request
        
    //     return entity;
    // }
    

}//class end