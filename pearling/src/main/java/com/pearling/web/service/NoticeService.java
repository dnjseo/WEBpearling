package com.pearling.web.service;

import java.util.List;

import com.pearling.web.entity.Notice;

public interface NoticeService {
    List<Notice> getList();

    Notice findById(int id);
    void addNotice(Notice notice);
    void deleteNotice(Notice notice);
    void updateNotice(Notice notice);

}
