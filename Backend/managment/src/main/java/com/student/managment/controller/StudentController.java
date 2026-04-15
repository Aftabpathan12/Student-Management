//package com.student.managment.controller;
//
//import org.springframework.web.bind.annotation.*;
//import com.student.managment.repository.*;
//import com.student.managment.entity.*;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.*;
//
//@RestController
//@RequestMapping("/api/student")
//@CrossOrigin("*")
//public class StudentController {
//
//    private final CourseRepository courseRepository;
//    private final PurchaseRepository purchaseRepository;
//    private final UserRepository userRepository;
//    private final OrderRepository orderRepository;
//    private final CartRepository cartRepository;
//
//    public StudentController(
//            CourseRepository courseRepository,
//            PurchaseRepository purchaseRepository,
//            UserRepository userRepository,
//            OrderRepository orderRepository,
//            CartRepository cartRepository
//    ) {
//        this.courseRepository = courseRepository;
//        this.purchaseRepository = purchaseRepository;
//        this.userRepository = userRepository;
//        this.orderRepository = orderRepository;
//        this.cartRepository = cartRepository;
//    }
//
//    // ✅ GET ALL COURSES
//    @GetMapping("/all-courses")
//    public List<Course> getAllCourses() {
//        return courseRepository.findAll();
//    }
//
//    // ✅ ADD TO CART
//    @PostMapping("/add-to-cart")
//    public String addToCart(@RequestParam Long courseId,
//                           @RequestParam String email) {
//
//        Course course = courseRepository.findById(courseId)
//                .orElseThrow(() -> new RuntimeException("Course not found"));
//
//        List<Cart> existing = cartRepository.findByUserEmail(email);
//
//        boolean alreadyExists = existing.stream()
//                .anyMatch(c -> c.getCourse().getId().equals(courseId));
//
//        if (alreadyExists) {
//            return "Already in cart";
//        }
//
//        Cart cart = new Cart();
//        cart.setUserEmail(email);
//        cart.setCourse(course);
//
//        cartRepository.save(cart);
//
//        return "Added to cart";
//    }
//
//    // ✅ GET CART
//    @GetMapping("/cart")
//    public List<Cart> getCart(@RequestParam String email) {
//        return cartRepository.findByUserEmail(email);
//    }
//
//    // ✅ CREATE ORDER (FIXED)
//    @PostMapping("/create-order")
//    public String createOrder(@RequestParam String email) {
//
//        List<Cart> cartItems = cartRepository.findByUserEmail(email);
//
//        if (cartItems.isEmpty()) {
//            throw new RuntimeException("Cart is empty ❌");
//        }
//
//        for (Cart item : cartItems) {
//
//            if (item.getCourse() == null) {
//                throw new RuntimeException("Course missing in cart ❌");
//            }
//
//            Order order = new Order();
//            order.setUserEmail(email);
//            order.setCourse(item.getCourse());
//            order.setAmount(item.getCourse().getPrice());
//            order.setStatus("PENDING");
//            order.setDate(java.time.LocalDateTime.now());
//
//            orderRepository.save(order);
//        }
//
//        return "ORDER CREATED";
//    }
//
//    // ✅ CONFIRM ORDER
//    @PostMapping("/confirm-order")
//    @Transactional
//    public String confirmOrder(@RequestBody Map<String, String> data) {
//
//        String email = data.get("email");
//        String address = data.get("address");
//        String phone = data.get("phone");
//        String name = data.get("name");
//        String city = data.get("city");
//        String pincode = data.get("pincode");
//        String paymentMethod = data.get("paymentMethod");
//
//        if (email == null || address == null || phone == null) {
//            throw new RuntimeException("Missing required fields ❌");
//        }
//
//        List<Order> orders = orderRepository
//                .findByUserEmailAndStatus(email, "PENDING");
//
//        if (orders.isEmpty()) {
//            throw new RuntimeException("No pending orders ❌");
//        }
//
//        User user = userRepository.findByEmailIgnoreCase(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        for (Order order : orders) {
//
//            order.setStatus("SUCCESS");
//            order.setPaymentId("PAY_" + System.currentTimeMillis());
//
//            // ✅ SAVE ALL DATA
//            order.setName(name);
//            order.setAddress(address);
//            order.setPhone(phone);
//            order.setCity(city);
//            order.setPincode(pincode);
//            order.setPaymentMethod(paymentMethod);
//
//            orderRepository.save(order);
//
//            if (!purchaseRepository.existsByUserAndCourse(user, order.getCourse())) {
//                Purchase p = new Purchase();
//                p.setUser(user);
//                p.setCourse(order.getCourse());
//                purchaseRepository.save(p);
//            }
//        }
//
//        cartRepository.deleteByUserEmail(email);
//
//        return "PAYMENT SUCCESS";
//    }
//}


package com.student.managment.controller;

import org.springframework.web.bind.annotation.*;
import com.student.managment.repository.*;
import com.student.managment.entity.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    private final CourseRepository courseRepository;
    private final PurchaseRepository purchaseRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    public StudentController(
            CourseRepository courseRepository,
            PurchaseRepository purchaseRepository,
            UserRepository userRepository,
            OrderRepository orderRepository,
            CartRepository cartRepository
    ) {
        this.courseRepository = courseRepository;
        this.purchaseRepository = purchaseRepository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
    }

    @GetMapping("/all-courses")
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @PostMapping("/add-to-cart")
    public String addToCart(@RequestParam Long courseId,
                           @RequestParam String email) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // ✅ CHECK EXISTING CART ITEM
        Optional<Cart> existingCart =
                cartRepository.findByUserEmailAndCourse_Id(email, courseId);

        if (existingCart.isPresent()) {

            Cart cart = existingCart.get();
            cart.setQuantity(cart.getQuantity() + 1);

            cartRepository.save(cart);

            System.out.println("UPDATED QTY: " + cart.getQuantity());

            return "Quantity updated";
        }

        // ✅ NEW ITEM
        Cart newCart = new Cart();
        newCart.setUserEmail(email);
        newCart.setCourse(course);
        newCart.setQuantity(1);

        cartRepository.save(newCart);

        System.out.println("NEW ITEM ADDED");

        return "Added to cart";
    }

    @GetMapping("/cart")
    public List<Cart> getCart(@RequestParam String email) {
        return cartRepository.findByUserEmail(email);
    }

    @PostMapping("/create-order")
    public String createOrder(@RequestParam String email) {

        List<Cart> cartItems = cartRepository.findByUserEmail(email);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty ❌");
        }

        for (Cart item : cartItems) {

            Order order = new Order();
            order.setUserEmail(email);
            order.setCourse(item.getCourse());

            // ✅ SET QTY FIRST
            order.setQuantity(item.getQuantity());

            // ✅ SET AMOUNT (ONLY ONCE)
            order.setAmount(item.getCourse().getPrice() * item.getQuantity());

            order.setStatus("PENDING");
            order.setDate(java.time.LocalDateTime.now());

            orderRepository.save(order);
        }

        return "ORDER CREATED";
    }
    
    @PostMapping("/confirm-order")
    @Transactional
    public String confirmOrder(@RequestBody Map<String, String> data) {

        String email = data.get("email");

        List<Order> orders = orderRepository
        		.findByUserEmailAndStatus(email, "PENDING");

        if (orders.isEmpty()) {
            throw new RuntimeException("No pending orders ❌");
        }

        for (Order order : orders) {

            order.setStatus("SUCCESS");
            order.setApprovalStatus("PENDING");
            order.setPaymentId("PAY_" + System.currentTimeMillis());

            order.setName(data.get("name"));
            order.setAddress(data.get("address"));
            order.setPhone(data.get("phone"));
            order.setCity(data.get("city"));
            order.setPincode(data.get("pincode"));
            order.setPaymentMethod(data.get("paymentMethod"));

            orderRepository.save(order);
        }

        // ✅ SAFE DELETE (no error)
        cartRepository.deleteByUserEmail(email);

        return "PAYMENT SUCCESS";
    }
    
    @PutMapping("/reject-order/{id}")
    public String rejectOrder(@PathVariable Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setApprovalStatus("REJECTED");

        orderRepository.save(order);

        return "REJECTED SUCCESS";
    }
    
    @GetMapping("/my-courses")
    public List<Course> getMyCourses(@RequestParam String email) {

        System.out.println("EMAIL: " + email);

        if (email == null || email.trim().isEmpty() || email.equals("undefined")) {
            return new ArrayList<>(); // safe return
        }

        Optional<User> userOpt = userRepository.findByEmailIgnoreCase(email.trim());

        if (userOpt.isEmpty()) {
            return new ArrayList<>();
        }

        User user = userOpt.get();

        List<Purchase> purchases = purchaseRepository.findByUser(user);

        List<Course> courses = new ArrayList<>();

        for (Purchase p : purchases) {
            courses.add(p.getCourse());
        }

        return courses;
    }
    @DeleteMapping("/remove-from-cart/{id}")
    public String removeFromCart(@PathVariable Long id) {

        cartRepository.deleteById(id);

        return "Item removed";
    }
    
    @PutMapping("/update-quantity")
    public String updateQuantity(@RequestParam Long cartId,
                                 @RequestParam int quantity) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.setQuantity(quantity);
        cartRepository.save(cart);

        return "Quantity updated";
    }
}