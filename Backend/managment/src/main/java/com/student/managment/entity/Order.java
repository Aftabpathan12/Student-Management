//package com.student.managment.entity;
//
//import java.time.LocalDateTime;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Table;
//@Entity
//@Table(name = "orders")
//public class Order {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String userEmail;
//
//    @ManyToOne
//    private Course course;
//
//    private double amount;
//
//    private String status;
//
//    private String paymentId;
//
//    private String name;        // ✅ NEW
//    public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public Order(Long id, String userEmail, Course course, double amount, String status, String paymentId, String name,
//			String address, String phone, String city, String pincode, String paymentMethod, LocalDateTime date) {
//		super();
//		this.id = id;
//		this.userEmail = userEmail;
//		this.course = course;
//		this.amount = amount;
//		this.status = status;
//		this.paymentId = paymentId;
//		this.name = name;
//		this.address = address;
//		this.phone = phone;
//		this.city = city;
//		this.pincode = pincode;
//		this.paymentMethod = paymentMethod;
//		this.date = date;
//	}
//
//	public String getUserEmail() {
//		return userEmail;
//	}
//
//	public void setUserEmail(String userEmail) {
//		this.userEmail = userEmail;
//	}
//
//	public Course getCourse() {
//		return course;
//	}
//
//	public void setCourse(Course course) {
//		this.course = course;
//	}
//
//	public double getAmount() {
//		return amount;
//	}
//
//	public void setAmount(double amount) {
//		this.amount = amount;
//	}
//
//	public String getStatus() {
//		return status;
//	}
//
//	public void setStatus(String status) {
//		this.status = status;
//	}
//
//	public String getPaymentId() {
//		return paymentId;
//	}
//
//	public void setPaymentId(String paymentId) {
//		this.paymentId = paymentId;
//	}
//
//	public String getName() {
//		return name;
//	}
//
//	public void setName(String name) {
//		this.name = name;
//	}
//
//	public String getAddress() {
//		return address;
//	}
//
//	public void setAddress(String address) {
//		this.address = address;
//	}
//
//	public String getPhone() {
//		return phone;
//	}
//
//	public void setPhone(String phone) {
//		this.phone = phone;
//	}
//
//	public String getCity() {
//		return city;
//	}
//
//	public void setCity(String city) {
//		this.city = city;
//	}
//
//	public String getPincode() {
//		return pincode;
//	}
//
//	public void setPincode(String pincode) {
//		this.pincode = pincode;
//	}
//
//	public String getPaymentMethod() {
//		return paymentMethod;
//	}
//
//	public void setPaymentMethod(String paymentMethod) {
//		this.paymentMethod = paymentMethod;
//	}
//
//	public LocalDateTime getDate() {
//		return date;
//	}
//
//	public void setDate(LocalDateTime date) {
//		this.date = date;
//	}
//
//	private String address;
//    private String phone;
//    private String city;        // ✅ NEW
//    private String pincode;     // ✅ NEW
//    private String paymentMethod; // ✅ NEW
//
//    private LocalDateTime date;
//
//    public Order() {
//    	}
//    }
//
//    // ✅ GETTERS & SETTERS (IMPORTANT)

package com.student.managment.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    @ManyToOne
    private Course course;

    private double amount;

    private int quantity; // ✅ NEW (IMPORTANT)

    private String status; // PAYMENT STATUS (PENDING / SUCCESS)

    private String approvalStatus; // (PENDING / APPROVED / REJECTED)

    private String paymentId;

    private String name;
    private String address;
    private String phone;
    private String city;
    private String pincode;
    private String paymentMethod;

    private LocalDateTime date;

    public Order() {}

    // ================= GETTERS & SETTERS =================

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public int getQuantity() { return quantity; } // ✅ NEW
    public void setQuantity(int quantity) { this.quantity = quantity; } // ✅ NEW

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getApprovalStatus() { return approvalStatus; }
    public void setApprovalStatus(String approvalStatus) { this.approvalStatus = approvalStatus; }

    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
}