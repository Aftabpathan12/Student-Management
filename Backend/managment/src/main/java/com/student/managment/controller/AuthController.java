package com.student.managment.controller;

import org.springframework.web.bind.annotation.*;

import com.student.managment.dto.AuthResponse;
import com.student.managment.entity.User;
import com.student.managment.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

   
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

   
  
    @PostMapping("/login")
    public AuthResponse login(@RequestBody User user){

        User loggedUser = service.login(user.getEmail(), user.getPassword());

        return new AuthResponse(
            loggedUser.getEmail(),
            loggedUser.getRole()
        );
    }

    }

//package com.student.managment.controller;
//
//import org.springframework.web.bind.annotation.*;
//import com.student.managment.entity.User;
//import com.student.managment.repository.UserRepository;
//import com.student.managment.security.JwtUtil;
//import com.student.managment.service.UserService;
//import com.student.managment.dto.AuthResponse;
//
//import jakarta.servlet.http.HttpServletRequest;
//
//@RestController
//@RequestMapping("/api/auth")  
//public class AuthController {
//
//    private final UserService service;
//    private final UserRepository userRepository;
//    private final JwtUtil jwtUtil;   // ✅ ADD THIS
//
//    public AuthController(UserService service,
//                          UserRepository userRepository,
//                          JwtUtil jwtUtil) {   // ✅ ADD THIS
//        this.service = service;
//        this.userRepository = userRepository;
//        this.jwtUtil = jwtUtil;
//    }
//
//    // REGISTER
//    @PostMapping("/register")
//    public User register(@RequestBody User user) {
//        return service.register(user);
//    }
//
//    // LOGIN
//    @PostMapping("/login")
//    public AuthResponse login(@RequestBody User user) {
//
//        User loggedUser = service.login(user.getEmail(), user.getPassword());
//
//        String token = jwtUtil.generateToken(   // ✅ FIXED
//                loggedUser.getEmail(),
//                loggedUser.getRole()
//        );
//
//        return new AuthResponse(token, loggedUser.getRole());
//    }
//
//    // PROFILE
//    @GetMapping("/profile")
//    public User getProfile(HttpServletRequest request) {
//
//        String token = request.getHeader("Authorization").substring(7);
//        String email = jwtUtil.extractEmail(token);   // ✅ FIXED
//
//        return userRepository.findByEmailIgnoreCase(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//    }
//}