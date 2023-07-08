package com.pearling.web.api.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.entity.Notice;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.NoticeService;

@RestController("apiAdminNoticeController")
@RequestMapping("/api/admin/notice")
public class NoticeController{

    @Autowired
    NoticeService service;

    @GetMapping("list")
    public List<Notice> list(){
        return service.getList();
    }
    
    @PostMapping(consumes = "application/json", produces = "application/json")
    public void addNotice(@RequestBody Notice notice){
    
        service.addNotice(notice);
    }

    
    @DeleteMapping("{id}")
    public void deleteNoitce(@PathVariable("id") int id){

        Notice notice = service.findById(id);
        if(notice != null){
            service.deleteNotice(notice);
        }
    }

    @PutMapping("{id}")
    public void updateNotice(@PathVariable("id") int id,
                             @RequestBody Notice notice){
    
        System.out.println("Updated Notice: " + notice);
        System.out.println("Notice ID: " + id);                        
    
        service.updateNotice(notice);
    }
    

}