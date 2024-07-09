const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const PORT = process.env.PORT || 5000
const app = express();
// middleware setup
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Database configuration
const { connectDatabase } = require("./db/connect");
connectDatabase();

// Authentication middleware
const { verifyUser } = require("./middleware/auth");

// Routes Imports
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");
const personalRecipes = require("./routes/personal_recipes");

// base route
app.get("/", (req, res) => {
    res.send({ msg: "Server is running" }).status(200)
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/recipes", recipeRoutes);
app.use("/api/v1/my-recipes", verifyUser, personalRecipes)

// start server
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
});