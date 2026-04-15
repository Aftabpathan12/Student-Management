package com.student.managment.service;



import com.student.managment.entity.User;

public interface UserService {

    // Register new user
    User register(User user);

    // Login user
    User login(String email, String password);
}