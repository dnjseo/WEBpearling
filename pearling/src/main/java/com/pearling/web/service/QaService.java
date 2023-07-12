package com.pearling.web.service;

import java.util.List;

import com.pearling.web.entity.Qa;

public interface QaService {
    List<Qa> getList();

    Qa findById(Integer id);
    void addQa(Qa qa);
    void updateQa(Qa qa);
    Integer deleteQa(Integer id);
}