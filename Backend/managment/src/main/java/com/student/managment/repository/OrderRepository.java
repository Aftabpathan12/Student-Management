package com.student.managment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.student.managment.entity.Order;

import jakarta.transaction.Transactional;
import com.student.managment.entity.Course;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;



public interface OrderRepository extends JpaRepository<Order, Long> {

	List<Order> findByUserEmailAndStatus(String email, String status);
	@Transactional
	@Modifying
	@Query("DELETE FROM Order o WHERE o.course = :course")
	void deleteByCourse(@Param("course") Course course);
}