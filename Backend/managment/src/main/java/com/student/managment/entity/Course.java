//package com.student.managment.entity;
//
//import jakarta.persistence.*;
//
//@Entity
//public class Course {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String courseName;
//    private Double price;
//
//    public Course() {}
//
//    public Course(Long id, String courseName, Double price) {
//        this.id = id;
//        this.courseName = courseName;
//        this.price = price;
//    }
//
//    public Long getId() { return id; }
//    public String getCourseName() { return courseName; }
//    public Double getPrice() { return price; }
//
//    public void setId(Long id) { this.id = id; }
//    public void setCourseName(String courseName) { this.courseName = courseName; }
//    public void setPrice(Double price) { this.price = price; }
//}


package com.student.managment.entity;

import jakarta.persistence.*;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String courseName;

    private Double price;

    private String description;

    private String imageUrl;

    public Course() {}

    public Long getId() {
        return id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}