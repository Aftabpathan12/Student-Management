package com.student.managment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.student.managment.entity.Purchase;
import com.student.managment.entity.Course;
import com.student.managment.entity.User;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    // ✅ Already using in controller
    boolean existsByUserAndCourse(User user, Course course);

    List<Purchase> findByUser(User user);

    int countByUser(User user);

   
    
    @Transactional
    @Modifying
    @Query("DELETE FROM Purchase p WHERE p.course = :course")
    void deleteByCourse(@Param("course") Course course);
    
    
}