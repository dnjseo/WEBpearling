package com.pearling.web.repository;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

import com.pearling.web.entity.Todo;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class TodoRepositoryTest {
    @Autowired
	private TodoRepository repository;

    @Test
    void testFindAll() {
        List<Todo> list = repository.findAll();
        
        System.err.println(list);
    }
}
