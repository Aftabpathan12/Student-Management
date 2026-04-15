////package com.student.managment.controller;
////
////import org.springframework.web.bind.annotation.*;
////import com.student.managment.repository.UserRepository;
////import com.student.managment.entity.User;
////import com.student.managment.entity.Course;
////import com.student.managment.repository.CourseRepository;
////import com.student.managment.repository.PurchaseRepository;
////
////import jakarta.transaction.Transactional;
////
////import java.util.List;
////
////@RestController
////@RequestMapping("/api/admin")   // ✅ FIX
////@CrossOrigin("*")
////public class AdminController {
////
////    private final CourseRepository courseRepository;
////    private final PurchaseRepository purchaseRepository; // ✅ ADD HERE
////    private final UserRepository userRepository;
////    
////    public AdminController(CourseRepository courseRepository,
////            PurchaseRepository purchaseRepository,
////            UserRepository userRepository) {
////
////          this.courseRepository = courseRepository;
////          this.purchaseRepository = purchaseRepository;
////          this.userRepository = userRepository; // ✅ ADD HERE
////}
////
////    // ✅ ADD COURSE
////    @PostMapping("/course")
////    public Course addCourse(@RequestBody Course course) {
////        return courseRepository.save(course);
////    }
////
////    // ✅ GET ALL COURSES
////    @GetMapping("/courses")
////    public List<Course> getAllCourses() {
////        return courseRepository.findAll();
////    }
////
////    // ✅ UPDATE COURSE
////    @PutMapping("/course/{id}")
////    public Course updateCourse(@PathVariable Long id, @RequestBody Course updatedCourse) {
////
////        Course course = courseRepository.findById(id)
////                .orElseThrow(() -> new RuntimeException("Course not found"));
////
////        course.setCourseName(updatedCourse.getCourseName());
////        course.setPrice(updatedCourse.getPrice());
////        course.setDescription(updatedCourse.getDescription());
////        course.setImageUrl(updatedCourse.getImageUrl());
////
////        return courseRepository.save(course);
////    }
////
////    @DeleteMapping("/delete-course/{id}")
////    @Transactional
////    public String deleteCourse(@PathVariable Long id) {
////
////        Course course = courseRepository.findById(id)
////                .orElseThrow(() -> new RuntimeException("Course not found"));
////
////        purchaseRepository.deleteByCourse(course);
////
////     
////        courseRepository.delete(course);
////
////        return "Course deleted successfully";
////    }
////    @GetMapping("/students")
////    public List<User> getAllStudents() {
////        return userRepository.findAll();
////    }
////}
//package com.student.managment.controller;
//
//import org.springframework.web.bind.annotation.*;
//import com.student.managment.entity.Course;
//import com.student.managment.entity.Order;
//import com.student.managment.entity.Student;
//import com.student.managment.entity.User;
//import com.student.managment.repository.CourseRepository;
//import com.student.managment.repository.PurchaseRepository;
//import com.student.managment.repository.StudentRepository;
//import com.student.managment.repository.UserRepository;
//import com.student.managment.repository.OrderRepository;
//
//import jakarta.transaction.Transactional;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/admin")
//@CrossOrigin("*")
//public class AdminController {
//
//    private final CourseRepository courseRepository;
//    private final PurchaseRepository purchaseRepository;
//    private final UserRepository userRepository;
//    private final StudentRepository studentRepository;
//    private final OrderRepository orderRepository;
//
//    public AdminController(CourseRepository courseRepository,
//            PurchaseRepository purchaseRepository,
//            UserRepository userRepository,
//            StudentRepository studentRepository,
//            OrderRepository orderRepository) {   // ✅ ADD
//
//this.courseRepository = courseRepository;
//this.purchaseRepository = purchaseRepository;
//this.userRepository = userRepository;
//this.studentRepository = studentRepository;
//this.orderRepository = orderRepository; // ✅ ADD
//}
//
//    // ✅ ADD COURSE
//    @PostMapping("/course")
//    public Course addCourse(@RequestBody Course course) {
//        return courseRepository.save(course);
//    }
//
//    // ✅ GET ALL COURSES
//    @GetMapping("/courses")
//    public List<Course> getAllCourses() {
//        return courseRepository.findAll();
//    }
//
//    // ✅ GET ALL STUDENTS
//    @GetMapping("/students")
//    public List<Student> getAllStudents() {
//        return studentRepository.findAll();
//    }
//
//    // ✅ DELETE COURSE
//    @DeleteMapping("/delete-course/{id}")
//    @Transactional
//    public String deleteCourse(@PathVariable Long id) {
//
//        Course course = courseRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Course not found"));
//
//        purchaseRepository.deleteByCourse(course);
//        courseRepository.delete(course);
//
//        return "Course deleted successfully";
//    }
//    
//    @PutMapping("/toggle-user/{id}")
//    public String toggleUser(@PathVariable Long id) {
//
//        User user = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        user.setActive(!user.getActive());
//
//        userRepository.save(user);
//
//        return "User status updated";
//    }
//    
//    @PutMapping("/course/{id}")
//    public Course updateCourse(@PathVariable Long id, @RequestBody Course updatedCourse) {
//
//        Course course = courseRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Course not found"));
//
//        course.setCourseName(updatedCourse.getCourseName());
//        course.setPrice(updatedCourse.getPrice());
//        course.setDescription(updatedCourse.getDescription());
//        course.setImageUrl(updatedCourse.getImageUrl());
//
//        return courseRepository.save(course);
//    }
//    @GetMapping("/orders")
//    public List<Order> getAllOrders() {
//        return orderRepository.findAll();
//    }
//}


package com.student.managment.controller;

import org.springframework.web.bind.annotation.*;
import com.student.managment.entity.*;
import com.student.managment.repository.*;

import jakarta.transaction.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")   
public class AdminController {

    private final CourseRepository courseRepository;
    private final PurchaseRepository purchaseRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public AdminController(
            CourseRepository courseRepository,
            PurchaseRepository purchaseRepository,
            UserRepository userRepository,
            OrderRepository orderRepository
    ) {
        this.courseRepository = courseRepository;
        this.purchaseRepository = purchaseRepository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    // ✅ COURSES
    @GetMapping("/courses")
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // ✅ ORDERS
    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // ✅ STUDENTS (🔥 IMPORTANT FIX)
    @GetMapping("/students")
    public List<User> getAllStudents() {
        return userRepository.findAll();
    }

    // ✅ APPROVE
    @PutMapping("/approve-order/{id}")
    @Transactional
    public String approveOrder(@PathVariable Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getStatus().equals("SUCCESS")) {
            throw new RuntimeException("Payment not completed ❌");
        }

        User user = userRepository.findByEmailIgnoreCase(order.getUserEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ CREATE PURCHASE
        if (!purchaseRepository.existsByUserAndCourse(user, order.getCourse())) {
            Purchase p = new Purchase();
            p.setUser(user);
            p.setCourse(order.getCourse());
            purchaseRepository.save(p);
        }

        order.setApprovalStatus("APPROVED");
        orderRepository.save(order);

        return "APPROVED";
    }

    @PutMapping("/reject-order/{id}")
    @Transactional
    public String rejectOrder(@PathVariable Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        User user = userRepository.findByEmailIgnoreCase(order.getUserEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ REMOVE PURCHASE (ACCESS REMOVE)
        purchaseRepository.findByUser(user).forEach(p -> {
            if (p.getCourse().getId().equals(order.getCourse().getId())) {
                purchaseRepository.delete(p);
            }
        });

        order.setApprovalStatus("REJECTED");

        orderRepository.save(order);

        return "REJECTED";
    }
    
    @GetMapping("/dashboard-stats")
    public Map<String, Long> getDashboardStats() {

        long users = userRepository.count();
        long courses = courseRepository.count();
        long orders = orderRepository.count();

        Map<String, Long> stats = new HashMap<>();
        stats.put("users", users);
        stats.put("courses", courses);
        stats.put("orders", orders);

        return stats;
    }
    
 // ✅ ADD COURSE (IMPORTANT)
    @PostMapping("/course")
    public Course addCourse(@RequestBody Course course) {

        if (course.getCourseName() == null || course.getCourseName().isEmpty()) {
            throw new RuntimeException("Course name required ❌");
        }

        return courseRepository.save(course);
    }
    
    
    @PutMapping("/course/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course updatedCourse) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        course.setCourseName(updatedCourse.getCourseName());
        course.setPrice(updatedCourse.getPrice());
        course.setDescription(updatedCourse.getDescription());
        course.setImageUrl(updatedCourse.getImageUrl());

        return courseRepository.save(course);
    }
    
    @DeleteMapping("/delete-course/{id}")
    @Transactional
    public String deleteCourse(@PathVariable Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // ✅ DELETE FROM ORDER FIRST
        orderRepository.deleteByCourse(course);

        // ✅ DELETE FROM PURCHASE
        purchaseRepository.deleteByCourse(course);

        // ✅ THEN DELETE COURSE
        courseRepository.delete(course);

        return "Course deleted successfully";
    }
    
    @PutMapping("/toggle-user/{id}")
    public String toggleUser(@PathVariable Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ NULL SAFE FIX (IMPORTANT)
        if (user.getActive() == null) {
            user.setActive(true);
        } else {
            user.setActive(!user.getActive());
        }

        userRepository.save(user);

        return "User status updated";
    }
    
}