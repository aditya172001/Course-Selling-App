import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import UserDashboard from "./userDashboard";
import Register from "./register";
import Login from "./login";
import Courses from "./courses";
import PurchasedCourses from "./purchasedCourses";
import BuyCourse from "./buyCourse";
import axios from "axios";

const getCoursesURL = "http://localhost:3000/user/courses";

function App() {
  const [isRegistered, setIsRegistered] = useState(
    localStorage.getItem("usertoken") ? true : false
  );
  const [isLoggedin, setIsLoggedin] = useState(
    localStorage.getItem("usertoken") ? true : false
  );
  const [courses, setCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    if (isLoggedin) {
      axios
        .get(getCoursesURL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
        })
        .then((res) => {
          setCourses(res.data);
        })
        .catch((err) => {
          console.error("Error in fetching courses data.", err);
        });
    }
  }, [isLoggedin]);

  return (
    <Router>
      <Layout
        isLoggedin={isLoggedin}
        isRegistered={isRegistered}
        setIsRegistered={setIsRegistered}
        setIsLoggedin={setIsLoggedin}
      >
        <Routes>
          <Route
            path="/"
            element={
              <UserDashboard
                isRegistered={isRegistered}
                isLoggedin={isLoggedin}
              />
            }
          />
          <Route
            path="/register"
            element={<Register setIsRegistered={setIsRegistered} />}
          />
          <Route
            path="/login"
            element={
              <Login
                setIsRegistered={setIsRegistered}
                setIsLoggedin={setIsLoggedin}
              />
            }
          />
          <Route
            path="/courses"
            element={<Courses courses={courses} setCourses={setCourses} />}
          />
          <Route path="/courses/buy" element={<BuyCourse />} />
          <Route
            path="/courses/purchased"
            element={
              <PurchasedCourses
                purchasedCourses={purchasedCourses}
                setPurchasedCourses={setPurchasedCourses}
              />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
