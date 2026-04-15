package com.student.managment.dto;

public class StudentStatsResponse {

    private int totalCourses;
    private int pendingAssignments;
    private double attendance;

    public StudentStatsResponse(int totalCourses, int pendingAssignments, double attendance) {
        this.totalCourses = totalCourses;
        this.pendingAssignments = pendingAssignments;
        this.attendance = attendance;
    }

    public int getTotalCourses() {
        return totalCourses;
    }

    public int getPendingAssignments() {
        return pendingAssignments;
    }

    public double getAttendance() {
        return attendance;
    }
}