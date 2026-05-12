const express = require("express");
const cors = require("cors");
require("dotenv").config();
require('./database/connection')

const accountRoutes = require('./routes/accountRoutes')

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Node.js app is running");
});

app.get("/api/hi", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello",
  });
});

app.use('/api/accounts', accountRoutes)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});