const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Default Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Other routes
app.get("/api/products", (req, res) => {
  res.json([{ id: 1, name: "Product A" }, { id: 2, name: "Product B" }]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const connectDatabase = require("./db/Database");
const cloudinary = require("cloudinary");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// connect db
connectDatabase();




// create server
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT}`
  );
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
