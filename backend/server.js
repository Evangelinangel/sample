const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


require("dotenv").config();
const PORT = process.env.PORT || 8000;
const studentRoutes = require("./routes/studentRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/students", studentRoutes);


// MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB connected");

        app.listen(PORT,"0.0.0.0", () => {
            console.log("Server running on port " + PORT);
        });

    })
    .catch((error) => {

        console.log("MongoDB connection failed");
        console.log(error);

    });