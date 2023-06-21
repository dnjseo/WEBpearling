package com.pearling.web.api.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

     @GetMapping("{id}")
     public Todo detail(
        @PathVariable("id") int id){

            Todo todo = service.findById(id);

            return todo;
        }


@PutMapping
public ResponseEntity<String> updateTodo(@RequestBody Map<Integer, Boolean> requestData,
        @AuthenticationPrincipal MyUserDetails user, Authentication authentication) {

    MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
    int userId = userDetails.getId();

    for (Map.Entry<Integer, Boolean> entry : requestData.entrySet()) {
        Integer todoId = entry.getKey();
        boolean isChecked = entry.getValue();

        // TODO: 데이터베이스에서 해당 todo를 찾아서 체크 상태 업데이트
        Todo todo = service.findById(todoId);
        if (todo != null) {
            Todo updateTodo = Todo.builder()
                        .statement(isChecked)
                        .build();   
            service.updateTodo(todo);
            System.out.println("Todo 업데이트 성공 - todoId: " + todoId);
        } else {
            System.out.println("Todo를 찾을 수 없음 - todoId: " + todoId);
        }
    }

    return ResponseEntity.ok("업데이트 완료");
}
    @PostMapping
     public ResponseEntity <String> addTodo(@RequestBody Todo todoData,
        @RequestParam(value = "clickedDate", required = false) String clickedDate,
        @AuthenticationPrincipal MyUserDetails user, 
        Authentication authentication) {
            
    try {
       MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
        int userId = userDetails.getId();

                Todo newTodo = Todo.builder()
                        .date(todoData.getDate())
                        .content(todoData.getContent())
                        .memberId(userId)
                        .build();
                service.addTodo(newTodo);

                System.out.println("테스트입니다~~~~");

      // Todo 추가 후 업데이트된 목록을 다시 조회
        //List<Todo> updatedTodoList = service.getListByUserId(userId);
        return ResponseEntity.ok("제출 완");
        
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  @DeleteMapping("{id}")
  public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
      Todo todo = service.findById(id);

      if (todo != null) {
          int deletedRows = service.deleteTodo(todo);
          if (deletedRows > 0) {
              return ResponseEntity.ok().build(); // 성공적으로 삭제된 경우 200 OK 반환
          }
      }

      return ResponseEntity.notFound().build(); // 실패한 경우 404 Not Found 반환
  }


}// class end
