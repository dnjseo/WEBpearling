package com.pearling.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Notification;

@Mapper
public interface NotificationRepository {
    
    Notification findById(Integer id);
    void save(Notification notification);
    void update(Notification notification);
    void delete(Integer id);
    List<Notification> findByUserId(Integer userId);
    
}