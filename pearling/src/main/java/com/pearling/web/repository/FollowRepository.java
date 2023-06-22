package com.pearling.web.repository;

public interface FollowRepository {
    int countFollowerId(int fromId);
    int countFollowingId(int fromId);
}
