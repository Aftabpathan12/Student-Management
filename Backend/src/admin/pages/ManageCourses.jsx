// import React,{useEffect,useState} from "react";
// import API from "../../services/api";


// function ManageCourses(){

// const [editCourse,setEditCourse] = useState(null);
// const [courses,setCourses] = useState([])

// useEffect(()=>{
// loadCourses()
// },[])

// const loadCourses = async()=>{
// const res = await API.get("/admin/courses")
// setCourses(res.data)
// }

// const deleteCourse = async(id)=>{
// await API.delete(`/admin/delete-course/${id}`)
// loadCourses()
// }

// // ✅ UPDATE FUNCTION
// const updateCourse = async()=>{
// try{
// await API.put(`/admin/course/${editCourse.id}`, editCourse)

// alert("Course Updated ✅")

// setEditCourse(null)
// loadCourses()

// }catch(err){
// console.log(err)
// alert("Update failed ❌")
// }
// }

// return(
// <div>


// <div style={{display:"flex"}}>

// <div style={{padding:"20px"}}>
// <h2>Manage Courses</h2>

// <table border="1">

// <thead>
// <tr>
// <th>Title</th>
// <th>Price</th>
// <th>Image</th>
// <th>Action</th>
// </tr>
// </thead>

// <tbody>
// {
// courses.map(c=>(
// <tr key={c.id}>
// <td>{c.courseName}</td>
// <td>{c.price}</td>

// <td>
//   {c.imageUrl ? (
//     <img src={c.imageUrl} alt="course" width="80" />
//   ) : "No Image"}
// </td>

// <td>
// <button onClick={()=>setEditCourse(c)}>Edit</button>
// <button onClick={()=>deleteCourse(c.id)}>Delete</button>
// </td>

// </tr>
// ))
// }
// </tbody>

// </table>

// {/* 🔥 EDIT FORM (IMPORTANT PART) */}
// {
// editCourse && (
// <div style={{marginTop:"20px", border:"1px solid black", padding:"10px"}}>
// <h3>Edit Course</h3>

// <input
// placeholder="Title"
// value={editCourse.courseName}
// onChange={(e)=>setEditCourse({...editCourse,courseName:e.target.value})}
// />

// <input
// placeholder="Description"
// value={editCourse.description}
// onChange={(e)=>setEditCourse({...editCourse,description:e.target.value})}
// />

// <input
// type="number"
// placeholder="Price"
// value={editCourse.price}
// onChange={(e)=>setEditCourse({...editCourse,price:Number(e.target.value)})}
// />

// <input
// placeholder="Image URL"
// value={editCourse.imageUrl}
// onChange={(e)=>setEditCourse({...editCourse,imageUrl:e.target.value})}
// />

// <br/><br/>

// <button onClick={updateCourse}>Update</button>
// <button onClick={()=>setEditCourse(null)}>Cancel</button>

// </div>
// )
// }

// </div>
// </div>

// </div>
// )
// }

// export default ManageCourses;


import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./ManageCourses.css";

function ManageCourses() {
  const [editCourse, setEditCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/courses");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load courses ❌");
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await API.delete(`/admin/delete-course/${id}`);
        loadCourses();
        alert("Course deleted successfully ✅");
      } catch (err) {
        console.log(err);
        alert("Delete failed ❌");
      }
    }
  };

  const updateCourse = async () => {
    try {
      await API.put(`/admin/course/${editCourse.id}`, editCourse);
      alert("Course Updated ✅");
      setEditCourse(null);
      loadCourses();
    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    }
  };

  // Filter courses based on search
  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-courses-page">
      <div className="manage-container">
        
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <span className="header-icon"></span>
            <div>
              <h1>Manage Courses</h1>
              <p>View, edit, and manage all your courses</p>
            </div>
          </div>
          <div className="course-stats">
            <span className="stat-badge">
              Total Courses: {courses.length}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search courses by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Courses Table */}
        <div className="table-container">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading courses...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon"></span>
              <h3>No courses found</h3>
              <p>{searchTerm ? "Try a different search term" : "Start by adding your first course"}</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="courses-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course.id}>
                      <td className="image-cell">
                        {course.imageUrl ? (
                          <img 
                            src={course.imageUrl} 
                            alt={course.courseName}
                            className="course-image"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/60x60?text=No+Image";
                            }}
                          />
                        ) : (
                          <div className="no-image">No Image</div>
                        )}
                      </td>
                      <td className="title-cell">
                        <strong>{course.courseName}</strong>
                      </td>
                      <td className="description-cell">
                        {course.description?.substring(0, 80)}...
                      </td>
                      <td className="price-cell">
                        <span className="price-tag">₹{course.price}</span>
                      </td>
                      <td className="actions-cell">
                        <button 
                          onClick={() => setEditCourse(course)} 
                          className="edit-btn"
                        >
                           Edit
                        </button>
                        <button 
                          onClick={() => deleteCourse(course.id)} 
                          className="delete-btn"
                        >
                           Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editCourse && (
          <div className="modal-overlay" onClick={() => setEditCourse(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>✏️ Edit Course</h3>
                <button className="modal-close" onClick={() => setEditCourse(null)}>✕</button>
              </div>
              
              <div className="modal-body">
                <div className="form-group">
                  <label>Course Title</label>
                  <input
                    type="text"
                    placeholder="Enter course title"
                    value={editCourse.courseName}
                    onChange={(e) => setEditCourse({...editCourse, courseName: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Enter course description"
                    value={editCourse.description}
                    onChange={(e) => setEditCourse({...editCourse, description: e.target.value})}
                    rows="4"
                    className="form-textarea"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      placeholder="Enter price"
                      value={editCourse.price}
                      onChange={(e) => setEditCourse({...editCourse, price: Number(e.target.value)})}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="text"
                      placeholder="Enter image URL"
                      value={editCourse.imageUrl}
                      onChange={(e) => setEditCourse({...editCourse, imageUrl: e.target.value})}
                      className="form-input"
                    />
                  </div>
                </div>

                {editCourse.imageUrl && (
                  <div className="image-preview">
                    <label>Image Preview:</label>
                    <img 
                      src={editCourse.imageUrl} 
                      alt="Preview"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/200x120?text=Invalid+URL";
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button onClick={updateCourse} className="update-btn">
                  Update Course
                </button>
                <button onClick={() => setEditCourse(null)} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageCourses;
