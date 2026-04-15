package com.student.managment.dto;

public class AddCourseRequest {

    private Long userId;
    private String courseName;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
}