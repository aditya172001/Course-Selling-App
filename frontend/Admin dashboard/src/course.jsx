import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Course({
  _id,
  title,
  description,
  imageURL,
  setCourses,
}) {
  const navigate = useNavigate();
  const deleteURL = `http://localhost:3000/admin/courses/${_id}`;

  function handleUpdate() {
    navigate("/courses/update", { state: _id });
  }

  function handleDelete() {
    axios
      .delete(deleteURL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
        },
      })
      .then(() => {
        setCourses((courses) => courses.filter((course) => course._id !== _id));
      })
      .catch((err) => {
        console.error("Error in delting data", err);
      });
  }

  return (
    <Card sx={{ minWidth: "300px", maxWidth: "300px", margin: "10px" }}>
      <CardMedia sx={{ height: "150px" }} image={imageURL} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={handleUpdate}>
          Update
        </Button>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={handleDelete}
          endIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
