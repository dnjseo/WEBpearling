package com.pearling.web.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pearling.web.entity.Schedule;
import com.pearling.web.repository.FriendTagRepository;
import com.pearling.web.repository.ScheduleRepository;

@Service
public class ScheduleServiceImp implements ScheduleService {

    @Autowired
    private ScheduleRepository repository;

    @Autowired
    private FriendTagRepository tagRepository;

    @Override
    public List<Schedule> getList() {
        List<Schedule> list = repository.findAll();
        return list;
    }
    
    @Override
    public List<Schedule> getList(int offset, int pageSize) {
        return repository.findAllAdmin(offset, pageSize);
    }

    @Override
    public List<Schedule> getList(int offset, int pageSize, String query) {
        return repository.findAllWithQuery(offset, pageSize, query);
    }

    @Override
    public List<Schedule> getListByQuery(String query) {
        return repository.findAllSch(query);
    }

    @Override
    public List<Schedule> getListByUserId(Integer memberId) {
        List<Schedule> schedules = repository.findByUserId(memberId);

        for (Schedule schedule : schedules) {
            if(tagRepository.findByScheduleId(schedule.getId()) == null){
                return schedules;
            }
             List<String> friendTags = tagRepository.findNicknameByScheduleId(schedule.getId());
            schedule.setFriendNicknames(friendTags);
        }

        return schedules;
    }

    @Override
    public List<Schedule> getListByDate(Integer memberId, LocalDate date) {
 
        List<Schedule> schedules = repository.findByDate(memberId, date);

       for (Schedule schedule : schedules) {
            if(tagRepository.findByScheduleId(schedule.getId()) == null){
                return schedules;
            }
             List<String> friendTags = tagRepository.findNicknameByScheduleId(schedule.getId());
            schedule.setFriendNicknames(friendTags);
        }

        return schedules;
    }

    @Override
    public Schedule get(Integer id){
        return repository.findById(id);
    }

    @Override
    public Schedule findById(Integer id) {
        return repository.findById(id);
    }

    @Transactional
    @Override
    public int addSchedule(Schedule schedule) {
        repository.save(schedule);
        //등록 후 id 값 반환!!
        return schedule.getId();
    }

    @Override
    public void updateSchedule(Schedule schedule) {
        repository.update(schedule);
    }

    @Override
    public int deleteSchedule(Schedule schedule) {
        return repository.delete(schedule);
    }
    
    @Override
    public void delete(Integer id) {
        repository.deleteAdmin(id);
    }

    @Override
    public List<Schedule> getListByCurDate(Integer memberId, LocalDate date) {
        return repository.findByCurDate(memberId, date);
    }

    @Override
    public int allCount() {
        return repository.allCount();
    }

    @Override
    public int getTotalCountWithQuery(String query) {
        return repository.getTotalCountWithQuery(query);
    }
}