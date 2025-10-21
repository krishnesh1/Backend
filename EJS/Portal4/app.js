const express = require("express");
const app = express();

// Set view engine
app.set("view engine", "ejs");

// Example routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Simulated validation error
app.get("/form", (req, res, next) => {
  const error = new Error("Invalid form inputs");
  error.type = "VALIDATION";
  error.statusCode = 400;
  next(error);
});

// 404 Handler
app.use((req, res, next) => {
  const errorData = {
    errorType: "NOT_FOUND",
    statusCode: 404,
    message: "The requested page does not exist.",
    timestamp: new Date(),
    requestUrl: req.originalUrl
  };
  res.status(404).render("error-layout", { errorData });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  let errorData = {
    errorType: err.type || "SERVER_ERROR",
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong",
    timestamp: new Date(),
    requestUrl: req.originalUrl
  };
  res.status(errorData.statusCode).render("error-layout", { errorData });
});

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
