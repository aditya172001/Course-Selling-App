import { useEffect, useState } from "react";
import AdminDashboard from "./adminDashboard";
import Courses from "./courses";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import FormAddCourse from "./form-add-course";
import FormUpdateCourse from "./form-update-course";
import Register from "./register";
import Login from "./login";
import Layout from "./layout";
import axios from "axios";

const getCoursesURL = "http://localhost:3000/admin/courses";

function App() {
  const [isRegistered, setIsRegistered] = useState(
    localStorage.getItem("admintoken") ? true : false
  );
  const [isLoggedin, setIsLoggedin] = useState(
    localStorage.getItem("admintoken") ? true : false
  );
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (isLoggedin) {
      axios
        .get(getCoursesURL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
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
              <AdminDashboard
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
          <Route
            path="/courses/add"
            element={<FormAddCourse setCourses={setCourses} />}
          />
          <Route
            path="/courses/update"
            element={<FormUpdateCourse setCourses={setCourses} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
