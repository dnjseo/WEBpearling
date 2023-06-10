package com.pearling.web.service;

import java.util.List;

import com.pearling.web.entity.Qa;

public interface QaService {
    List<Qa> getList();
    int count();

    Qa findById(int id);
    void addQa(Qa qa);
    void updateQa(Qa qa);
    void deleteQa(Qa qa);
}