package com.pearling.web.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pearling.web.entity.Member;
import com.pearling.web.service.MemberService;

@Controller
@RequestMapping("search")
public class SearchController extends BaseController {


    @Autowired
    private MemberService memberService;

    @GetMapping("list")
    public String list(
        @RequestParam(name = "q", required = false) String query,
        Model model) {
            
        model.addAttribute("headerShow", true);
       
        List<Member> memList = null;
        if (query == null) {
            memList = memberService.getList();
        } else {
            memList = memberService.getListByQuery(query);
        }

        model.addAttribute("memList", memList);

        return "search/list";
    }
}
