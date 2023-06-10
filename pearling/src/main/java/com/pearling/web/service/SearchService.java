package com.pearling.web.service;

import java.util.List;

import com.pearling.web.entity.Search;

public interface SearchService {
    List<Search> getList();
    List<Search> getListByQuery(String query);
}

