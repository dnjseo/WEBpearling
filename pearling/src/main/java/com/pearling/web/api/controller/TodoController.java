package com.pearling.web.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.entity.Schedule;
import com.pearling.web.entity.Todo;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.TodoService;

@RestController("apiTodoController")
@RequestMapping("api/todos")
public class TodoController {
    
    @Autowired
    private TodoService service;

    @GetMapping
    public List<Todo> todoList() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();

        int userId = userDetails.getId();
        String userNickname = userDetails.getNickname();

        List<Todo> todoList = new ArrayList<>();

        todoList = service.getListByUserId(userId);
        //System.out.println(todoList);

        return todoList;
    }


//       @PostMapping("/updateCheckbox")
//   public ResponseEntity<String> updateCheckbox(@RequestBody Map<String, Object> requestData) {
//     boolean isChecked = (boolean) requestData.get("isChecked");
    
//     // TODO: 데이터베이스에서 해당 todo를 찾아서 체크 상태 업데이트
//     // 예시로 todoId를 이용하여 업데이트하는 로직을 작성하였습니다.
//     Long todoId = 1L; // 업데이트할 todo의 ID
//     Todo todo = todoService.findById(todoId);
//     if (todo != null) {
//       todo.setChecked(isChecked);
//       service.save(todo);
//       return ResponseEntity.ok("체크 상태 업데이트 성공");
//     } else {
//       return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 todo를 찾을 수 없음");
//     }
//   }

}// class end
