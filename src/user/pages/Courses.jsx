// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../services/api";
// import "./Courses.css";

// function Courses() {

//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadCourses();
//   }, []);

//   const loadCourses = async () => {
//     try {
//       const res = await API.get("/student/all-courses");
//       setCourses(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const addToCart = async (id) => {
//     const email = localStorage.getItem("email");

//     if (!email) {
//       alert("Please login first ❌");
//       return;
//     }

//     try {
//       await API.post(`/student/add-to-cart?courseId=${id}&email=${email}`);
//       alert("Added to Cart 🛒");
//       navigate("/cart");
//     } catch (error) {
//       alert("Error ❌");
//     }
//   };

//   return (
//     <div className="courses-wrapper">

//       <h2 className="title">All Courses</h2>

//       <div className="courses-grid">

//         {courses.map((c) => (
//           <div className="course-card" key={c.id}>

//             <div className="image-box">
//               <img src={c.imageUrl} alt="course" />
//             </div>

//             <div className="course-body">
//               <h3>{c.courseName}</h3>
//               <p className="desc">{c.description}</p>
//               <p className="price">₹ {c.price}</p>

//               <button onClick={() => addToCart(c.id)}>
//                 Add to Cart 🛒
//               </button>
//             </div>

//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }

// export default Courses;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./Courses.css";

function Courses() {

  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]); // ✅ NEW
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
    loadMyCourses(); // ✅ NEW
  }, []);

  const loadCourses = async () => {
    try {
      const res = await API.get("/student/all-courses");
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ LOAD PURCHASED COURSES
  const loadMyCourses = async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) return;

      const res = await API.get(`/student/my-courses?email=${email}`);
      setMyCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ CHECK PURCHASED
  const isPurchased = (courseId) => {
    return myCourses.some((c) => c.id === courseId);
  };

  const addToCart = async (id) => {
    const email = localStorage.getItem("email");

    if (!email) {
      alert("Please login first ❌");
      return;
    }

    // ✅ FRONTEND CHECK
    if (isPurchased(id)) {
      alert("You already purchased this course ❌");
      return;
    }

    try {
      await API.post(`/student/add-to-cart?courseId=${id}&email=${email}`);
      alert("Added to Cart 🛒");
      navigate("/cart");
    } catch (error) {
      // ✅ SHOW BACKEND ERROR
      alert(error.response?.data || "Error ❌");
    }
  };

  return (
    <div className="courses-wrapper">

      <h2 className="title">All Courses</h2>

      <div className="courses-grid">

        {courses.map((c) => (
          <div className="course-card" key={c.id}>

           <div className="image-box">
  <img
    src={c.imageUrl}
    alt="course"
    style={{ width: "120px", height: "120px", objectFit: "contain" }}
  />
</div>

            <div className="course-body">
              <h3>{c.courseName}</h3>
              <p className="desc">{c.description}</p>
              <p className="price">₹ {c.price}</p>

              {/* ✅ UPDATED BUTTON */}
              <button
                onClick={() => addToCart(c.id)}
                disabled={isPurchased(c.id)}
                style={{
                  backgroundColor: isPurchased(c.id) ? "gray" : "",
                  cursor: isPurchased(c.id) ? "not-allowed" : "pointer"
                }}
              >
                {isPurchased(c.id)
                  ? "Already Purchased ✅"
                  : "Add to Cart 🛒"}
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Courses;