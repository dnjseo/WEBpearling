package com.pearling.web.service;

import java.time.LocalDate;
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

        // System.out.println(list);
        return list;
    }

      @Override
    public List<Schedule> getListByQuery(String query) {

        return repository.findAllSch(query);
    }

    @Override
    public List<Schedule> getListByUserId(int userId) {

        return repository.findByUserId(userId);
    }

    @Override
    public List<Schedule> getListByDate(int userId, LocalDate date) {
 
        return repository.findByDate(userId, date);
    }

    @Override
    public Schedule get(int id){

        return repository.findById(id);
    }

    @Override
    public int addSchedule(Schedule schedule) {

        return repository.save(schedule);
    }

    @Override
    public int updateSchedule(Schedule schedule) {

        return repository.update(schedule);
    }

    @Override
    public int deleteSchedule(int id) {

        return repository.delete(id);
    }

  
  
}
