import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Card,
} from "@mui/material";

const postURL = "http://localhost:3000/admin/courses";

export default function FormAddCourse({ setCourses }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [error, setError] = useState(null);

  function handleAddCourse(e) {
    e.preventDefault();
    const newCourse = {
      title,
      description,
      imageURL,
      price,
      isPublished,
    };
    axios
      .post(postURL, newCourse, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
        },
      })
      .then((res) => {
        setCourses((courses) => [...courses, { _id: res.courseID, newCourse }]);
        setError(null);
        console.log(res);
        navigate("/courses");
      })
      .catch((err) => {
        console.log(err);
        setError("Error adding course. Please try again later.");
        setTitle("");
        setDescription("");
        setImageURL("");
        setPrice("");
        setIsPublished(false);
      });
  }

  function handleCancelAdd() {
    navigate("/courses");
  }

  return (
    <div
      style={{
        marginTop: "100px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card variant="outlined" style={{ padding: "10px" }}>
        <form
          onSubmit={handleAddCourse}
          style={{ maxWidth: "500px" }}
          autoComplete="off"
        >
          <TextField
            value={title}
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="dense"
            sx={{ marginTop: "0px" }}
          />
          <TextField
            value={description}
            label="Description"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            value={imageURL}
            label="Image URL"
            variant="outlined"
            onChange={(e) => setImageURL(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            value={price}
            label="Price in ₹"
            variant="outlined"
            onChange={(e) =>
              setPrice(Number(e.target.value) ? Number(e.target.value) : "")
            }
            fullWidth
            margin="dense"
          />
          <FormHelperText>is Published</FormHelperText>
          <Select
            labelId="demo-simple-select-label"
            value={isPublished}
            onChange={(e) => setIsPublished(e.target.value)}
            fullWidth
            margin="dense"
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "10px", width: "100px" }}
          >
            Add
          </Button>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "10px", width: "100px", marginLeft: "10px" }}
            onClick={handleCancelAdd}
          >
            Cancel
          </Button>
        </form>
      </Card>
    </div>
  );
}
