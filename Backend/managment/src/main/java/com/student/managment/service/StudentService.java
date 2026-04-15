package com.student.managment.service;

import org.springframework.stereotype.Service;
import com.student.managment.dto.StatsResponse;
import com.student.managment.entity.*;
import com.student.managment.repository.*;

@Service
public class StudentService {

    private final UserRepository userRepository;
    private final PurchaseRepository purchaseRepository;
    private final AssignmentRepository assignmentRepository;
    private final StudentRepository studentRepository;

    public StudentService(UserRepository userRepository,
                          PurchaseRepository purchaseRepository,
                          AssignmentRepository assignmentRepository,
                          StudentRepository studentRepository) {
        this.userRepository = userRepository;
        this.purchaseRepository = purchaseRepository;
        this.assignmentRepository = assignmentRepository;
        this.studentRepository = studentRepository;
    }

    public StatsResponse getStats(String email) {

    	User user = userRepository.findByEmailIgnoreCase(email)
    	        .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        Student student = studentRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        int totalCourses = purchaseRepository.countByUser(user);
        int totalAssignments = assignmentRepository.countByUser(user);
        int pendingAssignments = assignmentRepository.countByUserAndSubmittedIsFalse(user);
        int completedLectures = totalAssignments - pendingAssignments;

        return new StatsResponse(
                totalCourses,
                completedLectures,
                pendingAssignments,
                student.getAttendance() != null ? student.getAttendance() : 0
        );
    }
}