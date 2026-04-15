package com.student.managment.entity;

import jakarta.persistence.*;

@Entity
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private boolean submitted;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Assignment() {}

    public Assignment(Long id, String title, boolean submitted, User user) {
        this.id = id;
        this.title = title;
        this.submitted = submitted;
        this.user = user;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public boolean isSubmitted() { return submitted; }
    public User getUser() { return user; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setSubmitted(boolean submitted) { this.submitted = submitted; }
    public void setUser(User user) { this.user = user; }
}