package com.student.managment.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.student.managment.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailIgnoreCase(String email);
    
}