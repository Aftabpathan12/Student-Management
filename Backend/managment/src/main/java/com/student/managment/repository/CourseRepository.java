package com.student.managment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.student.managment.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

}