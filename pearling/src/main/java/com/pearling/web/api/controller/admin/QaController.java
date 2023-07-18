package com.pearling.web.api.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.service.QaService;

@RestController("apiAdminQaController")
@RequestMapping("/api/admin/Qa")
public class QaController {
    
    @Autowired
    private QaService service;
   
    @DeleteMapping("{id}")
    public void deleteQa(@PathVariable("id") Integer id){
        
        service.deleteQa(id);
    }
}
