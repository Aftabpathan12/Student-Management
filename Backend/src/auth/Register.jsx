// import React, { useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// function Register() {

// const navigate = useNavigate();

// const [user,setUser] = useState({
// firstName: "",   // ✅ NEW
// lastName: "",    // ✅ NEW
// email:"",
// password:""
// });

// const handleChange = (e)=>{
// setUser({...user,[e.target.name]:e.target.value});
// }

// const register = async(e)=>{
// e.preventDefault();

// try{
//   await API.post("/auth/register",user);

//   alert("Registered Successfully ✅");
//   navigate("/login");

// }catch(err){
//   console.log(err);
//   alert("Registration Failed ❌");
// }
// }

// return(

// <div>
// <h2>Register</h2>

// <form onSubmit={register}>

// <input
// type="text"
// name="firstName"
// placeholder="First Name"
// onChange={handleChange}
// />

// <input
// type="text"
// name="lastName"
// placeholder="Last Name"
// onChange={handleChange}
// />

// <input
// type="email"
// name="email"
// placeholder="Email"
// onChange={handleChange}
// />

// <input
// type="password"
// name="password"
// placeholder="Password"
// onChange={handleChange}
// />

// <button>Register</button>

// </form>
// </div>
// )
// }

// export default Register;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!user.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (user.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }
    
    if (!user.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (user.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }
    
    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!user.password) {
      newErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const register = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Sending only the fields that match your backend User entity
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
        // role and active will be set by backend with default values
      };
      
      await API.post("/auth/register", userData);
      
      alert("Registered Successfully ✅");
      navigate("/login");
      
    } catch (err) {
      console.log(err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Registration Failed ❌ Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        
        {/* Left Side - Illustration */}
        <div className="register-left">
          <div className="illustration">
            <div className="illustration-icon"></div>
            <h2>Join Student Portal</h2>
            <p>Start your learning journey with us today</p>
            <div className="features">
              <div className="feature">
                <span>✓</span>
                <span>Access to premium courses</span>
              </div>
              <div className="feature">
                <span>✓</span>
                <span>Learn from industry experts</span>
              </div>
              <div className="feature">
                <span>✓</span>
                <span>Get certified</span>
              </div>
              <div className="feature">
                <span>✓</span>
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="register-right">
          <div className="register-form-container">
            
            <div className="form-header">
              <h1>Create Account</h1>
              <p>Register to get started</p>
            </div>

            <form onSubmit={register} className="register-form">
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">
                    First Name <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon"></span>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Enter first name"
                      value={user.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? "error" : ""}
                    />
                  </div>
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">
                    Last Name <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon"></span>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Enter last name"
                      value={user.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? "error" : ""}
                    />
                  </div>
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon"></span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={user.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon"></span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    value={user.password}
                    onChange={handleChange}
                    className={errors.password ? "error" : ""}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "" : ""}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
                <div className="password-hint">
                  Password must be at least 6 characters
                </div>
              </div>

              <button type="submit" className="register-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="login-link">
                Already have an account? <Link to="/login">Sign in</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;