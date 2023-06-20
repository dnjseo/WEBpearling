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
    public List<Schedule> getListByUserId(int memberId) {

        return repository.findByUserId(memberId);
    }

    @Override
    public List<Schedule> getListByDate(int memberId, LocalDate date) {
 
        return repository.findByDate(memberId, date);
    }

    @Override
    public Schedule get(int id){
        return repository.findById(id);
    }

    @Override
    public Schedule findById(int id) {
        return repository.findById(id);
    }

    @Override
    public void addSchedule(Schedule schedule) {

        repository.save(schedule);
    }

    @Override
    public void updateSchedule(Schedule schedule) {

        repository.update(schedule);
    }


    @Override
    public void deleteSchedule(Schedule schedule) {
        
        repository.delete(schedule);
    }

  
  
}
