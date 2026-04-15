package com.student.managment.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.student.managment.entity.Student;
import com.student.managment.entity.User;

public interface StudentRepository extends JpaRepository<Student, Long> {
	Optional<Student> findByUser(User user);
}