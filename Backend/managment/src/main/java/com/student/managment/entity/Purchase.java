package com.student.managment.entity;

import jakarta.persistence.*;

@Entity
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Course course;

    public Purchase() {}

    public Purchase(Long id, User user, Course course) {
        this.id = id;
        this.user = user;
        this.course = course;
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public Course getCourse() { return course; }

    public void setId(Long id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setCourse(Course course) { this.course = course; }
}