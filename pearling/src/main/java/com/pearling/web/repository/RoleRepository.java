package com.pearling.web.repository;

import org.apache.ibatis.annotations.Mapper;

import com.pearling.web.entity.Role;

@Mapper
public interface RoleRepository {
    Role findById(int id);
}
