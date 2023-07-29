const express = require("express");
const app = express();
const connectDB = require("./config/db");
const routes = require("./routes");

connectDB();
app.use(express.json());
app.use("/", routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
