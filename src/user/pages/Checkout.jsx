import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    city: "",
    pincode: "",
    paymentMethod: "COD"
  });

  const [errors, setErrors] = useState({});

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ VALIDATION
  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";

    if (!form.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!form.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ✅ PAYMENT
  const payNow = async () => {

    if (!validateForm()) {
      return;
    }

    const email = localStorage.getItem("email");

    try {
      await API.post("/student/confirm-order", {
        email,
        ...form
      });

      alert("Payment Successful 🎉");
      navigate("/user/my-courses");

    } catch (error) {
      alert("Payment Failed ❌");
    }
  };

  return (
    <div className="checkout-wrapper">

      <div className="checkout-box">

        <h2>Checkout 💳</h2>

        {/* NAME + PHONE */}
        <div className="form-group">
          <div>
            <input 
              name="name" 
              placeholder="Full Name" 
              onChange={handleChange} 
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div>
            <input 
              name="phone" 
              placeholder="Phone Number" 
              onChange={handleChange} 
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
        </div>

        {/* ADDRESS */}
        <div>
          <input 
            name="address" 
            placeholder="Full Address" 
            onChange={handleChange} 
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        {/* CITY + PINCODE */}
        <div className="form-group">
          <div>
            <input 
              name="city" 
              placeholder="City" 
              onChange={handleChange} 
            />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>

          <div>
            <input 
              name="pincode" 
              placeholder="Pincode" 
              onChange={handleChange} 
            />
            {errors.pincode && <p className="error">{errors.pincode}</p>}
          </div>
        </div>

        {/* PAYMENT METHOD */}
        <select name="paymentMethod" onChange={handleChange}>
          <option value="COD">Cash on Delivery</option>
          <option value="ONLINE">Online Payment</option>
        </select>

        {/* BUTTON */}
        <button 
          onClick={payNow}
          disabled={
            !form.name ||
            !form.address ||
            !form.phone ||
            !form.city ||
            !form.pincode
          }
          style={{
            opacity:
              !form.name ||
              !form.address ||
              !form.phone ||
              !form.city ||
              !form.pincode
                ? 0.5
                : 1,
            cursor:
              !form.name ||
              !form.address ||
              !form.phone ||
              !form.city ||
              !form.pincode
                ? "not-allowed"
                : "pointer"
          }}
        >
          Pay Now 💳
        </button>

      </div>

    </div>
  );
}

export default Checkout;