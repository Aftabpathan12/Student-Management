package com.student.managment.dto;

import java.util.List;

public class OrderRequest {

    private String email;
    private String address;
    private String phone;
    private List<Long> courseIds;

    // getters setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public List<Long> getCourseIds() { return courseIds; }
    public void setCourseIds(List<Long> courseIds) { this.courseIds = courseIds; }
}