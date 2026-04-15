package com.student.managment.service;

import org.springframework.stereotype.Service;
import com.student.managment.entity.User;
import com.student.managment.entity.Student;
import com.student.managment.repository.UserRepository;
import com.student.managment.repository.StudentRepository;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repo;
    private final StudentRepository studentRepository;

    public UserServiceImpl(UserRepository repo,
                           StudentRepository studentRepository) {
        this.repo = repo;
        this.studentRepository = studentRepository;
    }

    @Override
    public User register(User user) {

        user.setPassword(user.getPassword());
        user.setRole("STUDENT");

        // ✅ default active
        user.setActive(true);

        User savedUser = repo.save(user);

        // create student
        Student student = new Student();
        student.setName(savedUser.getFirstName() + " " + savedUser.getLastName());
        student.setEmail(savedUser.getEmail());
        student.setUser(savedUser);
        student.setAttendance(0.0);

        studentRepository.save(student);

        return savedUser;
    }

    @Override
    public User login(String email, String password) {

        User user = repo.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ Password check
        if (!password.equals(user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // 🔥 ADD THIS (important)
        if (user.getActive() != null && !user.getActive()) {
            throw new RuntimeException("User is deactivated");
        }

        return user;
    }
}