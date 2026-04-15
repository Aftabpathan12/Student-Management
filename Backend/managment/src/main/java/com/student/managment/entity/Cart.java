package com.student.managment.entity;

import jakarta.persistence.*;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    @ManyToOne
    private Course course;
    
    @Column(nullable = false)
    private int quantity = 1;

    // ✅ GETTERS & SETTERS

    public Long getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public Course getCourse() {
        return course;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}