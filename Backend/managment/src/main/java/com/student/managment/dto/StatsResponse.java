package com.student.managment.dto;

public class StatsResponse {

    private int totalCourses;
    private int completedLectures;
    private int pendingAssignments;
    private double attendance;

    public StatsResponse() {}

    public StatsResponse(int totalCourses, int completedLectures, int pendingAssignments, double attendance) {
        this.totalCourses = totalCourses;
        this.completedLectures = completedLectures;
        this.pendingAssignments = pendingAssignments;
        this.attendance = attendance;
    }

    public int getTotalCourses() { return totalCourses; }
    public void setTotalCourses(int totalCourses) { this.totalCourses = totalCourses; }

    public int getCompletedLectures() { return completedLectures; }
    public void setCompletedLectures(int completedLectures) { this.completedLectures = completedLectures; }

    public int getPendingAssignments() { return pendingAssignments; }
    public void setPendingAssignments(int pendingAssignments) { this.pendingAssignments = pendingAssignments; }

    public double getAttendance() { return attendance; }
    public void setAttendance(double attendance) { this.attendance = attendance; }
}