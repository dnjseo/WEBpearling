package com.pearling.web.controller;

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
        

        model.addAttribute("memList", memList);
        model.addAttribute("tdList", tdList);
        model.addAttribute("scList", scList);
        model.addAttribute("searchResults", searchResults);

        return "search/list";
        
    }
}
