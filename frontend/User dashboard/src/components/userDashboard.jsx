import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";

export default function Landing({ isRegistered, isLoggedin }) {
  const navigate = useNavigate();
  function handleViewCourses() {
    if (isRegistered && isLoggedin) navigate("/courses");
    else if (isRegistered) navigate("/login");
    else navigate("/register");
  }

  return (
    <>
      <div
        style={{
          marginTop: "80px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "50px" }}>
          <Typography variant="h4" fontWeight={600} marginBottom="60px">
            User dashbord
          </Typography>
          <Button variant="contained" margin="20px" onClick={handleViewCourses}>
            View Courses
          </Button>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1532073145718-62df48eaa35e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3R1ZHklMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            alt="User Dashboard Image"
            style={{ maxWidth: "700px" }}
          />
        </div>
      </div>
    </>
  );
}
