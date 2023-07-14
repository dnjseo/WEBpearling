package com.pearling.web.api.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.entity.QaComment;
import com.pearling.web.service.QaCommentService;


@RestController("apiQaCommentController")
@RequestMapping("/api/admin/QaComment")
public class QaCommentController {

    @Autowired
    private QaCommentService service;
  
    @GetMapping("{qaId}")
    public List<QaComment> list(@PathVariable("qaId")Integer qaId){
        
        List<QaComment> qaComment = service.getList(qaId);

        return qaComment;
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public void post(@RequestBody QaComment qaComment){

        service.addComment(qaComment);
    }

    @DeleteMapping("{id}")
    public void delte(@PathVariable("id") Integer id){
        service.deleteComment(id);
    }

    @PutMapping("{id}")
    public void update(@PathVariable("id") Integer id,
                       @RequestBody QaComment qaComment){

        service.updateComment(qaComment);                
    }
    
    

  
}
