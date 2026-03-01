const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Shalommmmmm");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});