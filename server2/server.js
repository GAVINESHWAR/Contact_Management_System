const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const contactRoutes = require("./routes/contacts");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/contacts", contactRoutes);

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/contact-management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start Server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
