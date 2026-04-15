// import React, { useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// function Login() {

//   const navigate = useNavigate();

//   const [data, setData] = useState({
//     email: "",
//     password: ""
//   });

//   const change = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const login = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await API.post("/auth/login", data);

//       // ✅ Save role & email
//       localStorage.setItem("role", res.data.role);
//       localStorage.setItem("email", res.data.email);

//       console.log("LOGIN EMAIL:", res.data.email);

//       if (res.data.role === "ADMIN") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/user/dashboard");
//       }

//     } catch (err) {
//       console.log(err);
//       alert("Invalid Login ❌");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>

//       <form onSubmit={login}>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={change}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={change}
//           required
//         />

//         <button type="submit">Login</button>

//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const change = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!data.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      const res = await API.post("/auth/login", data);

      // Save role & email
   localStorage.setItem("email", data.email);
localStorage.setItem("role", res.data.role);
      
      // Save token if provided
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      
      // Remember me functionality
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", data.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      console.log("LOGIN EMAIL:", res.data.email);

      // Redirect based on role
      if (res.data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }

    } catch (err) {
      console.log(err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Invalid Login ❌ Please check your credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setData({ ...data, email: rememberedEmail });
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="login-page">
      <div className="login-container">
        
        {/* Left Side - Illustration */}
        <div className="login-left">
          <div className="illustration">
            <div className="illustration-icon"></div>
            <h2>Welcome Back!</h2>
            <p>Login to access your dashboard and continue learning</p>
            <div className="features">
              <div className="feature">
                <span>✓</span>
                <span>Access your courses</span>
              </div>
              <div className="feature">
                <span>✓</span>
                <span>Track your progress</span>
              </div>
              <div className="feature">
                <span>✓</span>
                <span>Get certificates</span>
              </div>
              <div className="feature">
                <span>✓</span>
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-right">
          <div className="login-form-container">
            
            <div className="form-header">
              <h1>Sign In</h1>
              <p>Enter your credentials to access your account</p>
            </div>

            <form onSubmit={login} className="login-form">
              
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
                    value={data.email}
                    onChange={change}
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
                    placeholder="Enter your password"
                    value={data.password}
                    onChange={change}
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
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="register-link">
                Don't have an account? <Link to="/register">Create Account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;