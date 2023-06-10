package com.pearling.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Search;
import com.pearling.web.repository.SearchRepository;

@Service
public class SearchServiceImp implements SearchService {

    @Autowired
    private SearchRepository repository;

    @Override
    public List<Search> getList() {

        return repository.findAll();
    }

    @Override
    public List<Search> getListByQuery(String query) {
        
        return repository.findAll("");
    }
    
}
