package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import com.pearling.web.entity.QaComment;

@Mapper
public interface QaCommentRepository {
    List<QaComment> findAll(Integer qaId);
    void save(QaComment qaComment);
    void delete(Integer id);
    void update(QaComment qaComment);
}
