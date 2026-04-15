// import React,{useState} from "react";
// import API from "../../services/api";

// function AddCourse(){

// const [course,setCourse] = useState({
//   courseName:"",
//   description:"",
//   price:0,
//   imageUrl:""   // ✅ NEW
// })

// const change=(e)=>{
// setCourse({...course,[e.target.name]:e.target.value})
// }

// const addCourse = async(e)=>{
// e.preventDefault()

// try{
//   await API.post("/admin/course",course)

//   alert("Course Added ✅")

//   // reset form
//   setCourse({
//     courseName:"",
//     description:"",
//     price:0,
//     imageUrl:""
//   })

// }catch(err){
//   console.log(err)
//   alert("Error adding course ❌")
// }
// }

// return(
// <div>



// <div style={{display:"flex"}}>


// <div style={{padding:"20px"}}>

// <h2>Add Course</h2>

// <form onSubmit={addCourse}>

// <input
// name="courseName"
// placeholder="Title"
// value={course.courseName}
// onChange={change}
// />

// <input
// name="description"
// placeholder="Description"
// value={course.description}
// onChange={change}
// />

// <input
// name="price"
// placeholder="Price"
// type="number"
// value={course.price}
// onChange={change}
// />

// {/* 🔥 NEW IMAGE FIELD */}
// <input
// name="imageUrl"
// placeholder="Image URL"
// value={course.imageUrl}
// onChange={change}
// />

// <button>Add Course</button>

// </form>

// </div>
// </div>

// </div>
// )
// }

// export default AddCourse;





import React, { useState } from "react";
import API from "../../services/api";
import "./AddCourse.css";

function AddCourse() {
  const [course, setCourse] = useState({
    courseName: "",
    description: "",
    price: 0,
    imageUrl: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  const change = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
    
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    
    // Update image preview
    if (e.target.name === "imageUrl") {
      setImagePreview(e.target.value);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!course.courseName.trim()) {
      newErrors.courseName = "Course title is required";
    }
    
    if (!course.description.trim()) {
      newErrors.description = "Course description is required";
    }
    
    if (!course.price || course.price <= 0) {
      newErrors.price = "Valid price is required";
    }
    
    if (!course.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addCourse = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await API.post("/admin/course", course);
      alert("Course Added ✅");
      
      // Reset form
      setCourse({
        courseName: "",
        description: "",
        price: 0,
        imageUrl: ""
      });
      setImagePreview("");
      
    } catch (err) {
      console.log(err);
      alert("Error adding course ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-course-page">
      <div className="add-course-container">
        
        {/* Header Section */}
        <div className="page-header">
          <div className="header-content">
            <span className="header-icon"></span>
            <div>
              <h1>Add New Course</h1>
              <p>Create and publish a new course</p>
            </div>
          </div>
        </div>

        <div className="main-content">
          {/* Form Section */}
          <div className="form-section">
            <form onSubmit={addCourse} className="course-form">
              
              <div className="form-group">
                <label htmlFor="courseName">
                  Course Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="courseName"
                  name="courseName"
                  placeholder="Enter course title"
                  value={course.courseName}
                  onChange={change}
                  className={errors.courseName ? "error" : ""}
                />
                {errors.courseName && <span className="error-message">{errors.courseName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="description">
                  Course Description <span className="required">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter detailed course description"
                  value={course.description}
                  onChange={change}
                  rows="5"
                  className={errors.description ? "error" : ""}
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">
                    Price (₹) <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Enter course price"
                    value={course.price}
                    onChange={change}
                    className={errors.price ? "error" : ""}
                  />
                  {errors.price && <span className="error-message">{errors.price}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="imageUrl">
                    Image URL <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="Enter image URL"
                    value={course.imageUrl}
                    onChange={change}
                    className={errors.imageUrl ? "error" : ""}
                  />
                  {errors.imageUrl && <span className="error-message">{errors.imageUrl}</span>}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Adding Course...
                    </>
                  ) : (
                    "Add Course"
                  )}
                </button>
                
                <button 
                  type="button" 
                  className="reset-btn"
                  onClick={() => {
                    setCourse({
                      courseName: "",
                      description: "",
                      price: 0,
                      imageUrl: ""
                    });
                    setImagePreview("");
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="preview-section">
            <div className="preview-card">
              <h3>Live Preview</h3>
              <div className="course-preview-card">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Course preview"
                    className="preview-img"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                    }}
                  />
                ) : (
                  <div className="preview-placeholder">
                    <span>🖼️</span>
                    <p>Image preview will appear here</p>
                  </div>
                )}
                
                <div className="preview-details">
                  <h4>{course.courseName || "Course Title"}</h4>
                  <p>{course.description || "Course description will appear here..."}</p>
                  <div className="preview-price-tag">
                    {course.price > 0 ? `₹${course.price}` : "Price"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;