package com.student.managment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.student.managment.entity.Assignment;
import com.student.managment.entity.User;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    int countByUser(User user);

    
    int countByUserAndSubmittedIsFalse(User user); // ✅ FIX
}