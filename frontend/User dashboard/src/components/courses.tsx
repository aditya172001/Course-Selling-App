import Course from "./course";
import { useEffect } from "react";
import axios from "axios";

const getCoursesURL = "http://localhost:3000/user/courses";

export default function Courses({ courses, setCourses }) {
  useEffect(() => {
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
  }, [setCourses]);

  return (
    <div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {courses.map((course) => (
          <Course
            key={course._id}
            _id={course._id}
            title={course.title}
            description={course.description}
            price={course.price}
            imageURL={course.imageURL}
          />
        ))}
      </div>
    </div>
  );
}
