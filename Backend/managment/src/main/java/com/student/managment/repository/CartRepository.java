package com.student.managment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.transaction.annotation.Transactional;

import com.student.managment.entity.Cart;


public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUserEmail(String email);

    Optional<Cart> findByUserEmailAndCourse_Id(String email, Long courseId);

    @Transactional
    void deleteByUserEmail(String email);
}