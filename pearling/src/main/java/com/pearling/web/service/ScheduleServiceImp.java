package com.pearling.web.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Schedule;
import com.pearling.web.repository.ScheduleRepository;

@Service
public class ScheduleServiceImp implements ScheduleService {

    @Autowired
    private ScheduleRepository repository;

    @Override
    public List<Schedule> getList() {
        List<Schedule> list = repository.findAll();

        System.out.println(list);
        return list;
    }

    @Override
    public List<Schedule> getListByDate(Date date) {
        return null;
    }

    @Override
    public Schedule findById(int id) {
        return repository.findById(id);
    }

    @Override
    public void addSchedule(Schedule schedule) {
    }

    @Override
    public void updateSchedule(Schedule schedule) {
    }

    @Override
    public void deleteSchedule(Schedule schedule) {
    }
    
}
