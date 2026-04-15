import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./MyCourses.css";

function MyCourses() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadMyCourses();
  }, []);

  const loadMyCourses = async () => {
    try {
      const email = localStorage.getItem("email");
      const res = await API.get(`/student/my-courses?email=${email}`);
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mycourses-wrapper">

      <h2 className="title">My Courses</h2>

      {courses.length === 0 ? (
        <p>No courses purchased ❌</p>
      ) : (

        <div className="mycourses-grid">
          {courses.map(c => (
            <div className="mycourse-card" key={c.id}>

              <div className="image-box">
                <img src={c.imageUrl} alt="course" />
              </div>

              <div className="course-body">
                <h3>{c.courseName}</h3>
                <p className="price">₹ {c.price}</p>
              </div>

            </div>
          ))}
        </div>

      )}

    </div>
  );
}

export default MyCourses;