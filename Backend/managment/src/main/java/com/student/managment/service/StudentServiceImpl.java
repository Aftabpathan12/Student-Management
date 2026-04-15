//package com.student.managment.service;
//
//import java.util.List;
//import org.springframework.stereotype.Service;
//import com.student.managment.entity.Student;
//import com.student.managment.repository.StudentRepository;
//
//@Service
//public class StudentServiceImpl implements StudentService {
//
//    private final StudentRepository repo;
//
//    public StudentServiceImpl(StudentRepository repo) {
//        this.repo = repo;
//    }
//
//    @Override
//    public Student addStudent(Student student) {
//        return repo.save(student);
//    }
//
//    @Override
//    public List<Student> getAllStudents() {
//        return repo.findAll();
//    }
//
//    @Override
//    public Student getStudentById(Long id) {
//        return repo.findById(id)
//                .orElseThrow(() -> new RuntimeException("Student not found"));
//    }
//
//    @Override
//    public Student updateStudent(Long id, Student student) {
//        Student existing = repo.findById(id)
//                .orElseThrow(() -> new RuntimeException("Student not found"));
//
//        existing.setName(student.getName());
//        existing.setEmail(student.getEmail());
//        existing.setCourse(student.getCourse());
//
//        return repo.save(existing);
//    }
//
//    @Override
//    public void deleteStudent(Long id) {
//        repo.deleteById(id);
//    }
//
//    // 🔥 NEW METHOD
//    @Override
//    public List<Student> getStudentsByUser(String email) {
//        return repo.findByUserEmail(email);
//    }
//}