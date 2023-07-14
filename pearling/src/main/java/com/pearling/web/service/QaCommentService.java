package com.pearling.web.service;

import java.util.List;

import com.pearling.web.entity.QaComment;

public interface QaCommentService {

    List<QaComment> getList(Integer qaId);
    void addComment(QaComment qaComment);
    void deleteComment(Integer id);
    void updateComment(QaComment qaComment);
}
