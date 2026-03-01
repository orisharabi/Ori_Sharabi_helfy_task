const express = require("express");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Shalommmmmm");
});

app.use("/api/tasks", tasksRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});