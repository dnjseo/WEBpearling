package com.pearling.web.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pearling.web.entity.Member;
import com.pearling.web.entity.Schedule;
import com.pearling.web.entity.Todo;
import com.pearling.web.service.MemberService;
import com.pearling.web.service.ScheduleService;
import com.pearling.web.service.TodoService;
import com.pearling.web.util.ElapsedTimeCalculator;

@Controller
@RequestMapping("search")
public class SearchController extends BaseController {

    @Autowired
    private MemberService memberService;
    
    @Autowired
    private TodoService todoService;

    @Autowired
    private ScheduleService scheduleService;

    @GetMapping("list")
    public String list(
        @RequestParam(name = "q", required = false) String query,
        Model model) {
            
        model.addAttribute("headerShow", true);
       
        List<Member> memList = null;
        List<Todo> tdList = null;
        List<Schedule> scList = null;
        
        String searchResults = "";

        if (query == null) {
            memList = memberService.getList();
            tdList = todoService.getList();
            scList = scheduleService.getList();
        } else {
            memList = memberService.getListByQuery(query);
            tdList = todoService.getListByQuery(query);
            scList = scheduleService.getListByQuery(query);
            
            searchResults = query;
        }
        
        for (Todo todo : tdList) {
            Date regDate = todo.getRegDate();
            System.out.println("일정 등록일자: " + regDate); // 등록일자 출력
            String elapsedTime = ElapsedTimeCalculator.getElapsedTime(regDate);
            todo.setFormattedDate(elapsedTime);
        }

        for (Schedule schedule : scList) {
            Date regDate = schedule.getRegDate();
            System.out.println("할 일 등록일자: " + regDate); // 등록일자 출력
            String elapsedTime = ElapsedTimeCalculator.getElapsedTime(regDate);
            schedule.setFormattedDate(elapsedTime);
        }
        

        model.addAttribute("memList", memList);
        model.addAttribute("tdList", tdList);
        model.addAttribute("scList", scList);
        model.addAttribute("searchResults", searchResults);

        return "search/list";
        
    }
}
