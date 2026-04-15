package com.student.managment.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private Double attendance;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    public Student() {}

    public Student(Long id, String name, String email, Double attendance, User user) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.attendance = attendance; // ✅ correct
        this.user = user;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Double getAttendance() { return attendance; }
    public void setAttendance(Double attendance) { this.attendance = attendance; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}