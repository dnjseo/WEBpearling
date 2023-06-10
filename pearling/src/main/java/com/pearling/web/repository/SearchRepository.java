package com.pearling.web.repository;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.pearling.web.entity.Search;

@Mapper
public interface SearchRepository {
    List<Search> findAll();
    List<Search> findAll(String query);
}
