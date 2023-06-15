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
        String searchResults = "";
        boolean searchResultsFlag = false;

        if (query == null) {
            memList = memberService.getList();
        } else {
            memList = memberService.getListByQuery(query);
            searchResultsFlag = !memList.isEmpty();
            searchResults = query;
        }

        model.addAttribute("memList", memList);
        model.addAttribute("searchResultsFlag", searchResultsFlag);
        model.addAttribute("searchResults", searchResults);

        List<Todo> tdList = null;
        boolean searchResultsFlag2 = false;
        if (query == null) {
            tdList = todoService.getList();
        } else {
            tdList = todoService.getListByQuery(query);
            searchResultsFlag2 = !tdList.isEmpty();
            searchResults = query;
        }

        model.addAttribute("tdList", tdList);
        model.addAttribute("searchResultsFlag2", searchResultsFlag2);
        model.addAttribute("searchResults", searchResults);

        List<Schedule> scList = null;
        boolean searchResultsFlag3 = false;
        if (query == null) {
            scList = scheduleService.getList();
        } else {
            scList = scheduleService.getListByQuery(query);
            searchResultsFlag3 = !scList.isEmpty();
            searchResults = query;
        }
        
        model.addAttribute("scList", scList);
        model.addAttribute("searchResultsFlag3", searchResultsFlag3);

        return "search/list";
        
    }
}
