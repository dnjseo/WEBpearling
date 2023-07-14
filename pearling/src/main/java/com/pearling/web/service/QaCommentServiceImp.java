package com.pearling.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.QaComment;
import com.pearling.web.repository.QaCommentRepository;

@Service
public class QaCommentServiceImp implements QaCommentService {

    @Autowired
    private QaCommentRepository repository;

    @Override
    public List<QaComment> getList(Integer qaId) {
        return repository.findAll(qaId);
    }

    @Override
    public void addComment(QaComment qaComment) {
       repository.save(qaComment);
    }

    @Override
    public void deleteComment(Integer id) {
        repository.delete(id);
    }

    @Override
    public void updateComment(QaComment qaComment) {
        repository.update(qaComment);
    }

    
}
