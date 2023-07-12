package com.pearling.web.api.controller;

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

import com.pearling.web.entity.Qa;
import com.pearling.web.service.QaService;

@RestController("apiQaController")
@RequestMapping("api/Qa")
public class QaController {
    
    @Autowired
    QaService service;

    @GetMapping
    public List<Qa> list(){
        return service.getList();
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public void addQa(@RequestBody Qa qa){
    
        service.addQa(qa);
    }

    @DeleteMapping("{id}")
    public void deleteQa(@PathVariable("id") Integer id){
        
        service.deleteQa(id);
    }

    @PutMapping("{id}")
    public void updateQa(@PathVariable("id") Integer id,
                         @RequestBody Qa qa){
        service.updateQa(qa);
    }

}
