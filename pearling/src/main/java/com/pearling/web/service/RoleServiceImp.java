package com.pearling.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Role;
import com.pearling.web.repository.RoleRepository;

@Service
public class RoleServiceImp implements RoleService{

    @Autowired
    private RoleRepository repository;

    @Override
    public Role getRoleById(int id) {
        return repository.findById(id);
    }
}