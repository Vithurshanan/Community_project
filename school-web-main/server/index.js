const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookie = require("cookie-parser");
const cors = require("cors");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const { dbConnection } = require("./config/dbConnections");
const errorMiddleware = require("./middlewares/error");
const UserRoute = require("./routes/UserRoute");
const EnrollmentRoute = require("./routes/Enrollment");
const AdminRoute = require("./routes/adminRoutes");


dotenv.config();

const app = express();


const corsOptions = {
  origin: "http://localhost:5173",  
  credentials: true, 
};

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.json({ limit: "50mb" }));
app.use(cookie());
app.use(cors(corsOptions));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Root route handler
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Serve static files (e.g., sitemap.xml)
app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "sitemap.xml"));
});

// API routes
app.use("/api", UserRoute);
app.use("/api", EnrollmentRoute);
app.use("/api/admin", AdminRoute);

// Logout Route (Example of async logout logic)
app.post("/api/logout", async (req, res, next) => {
  try {
    res.clearCookie("authToken"); // Adjust this according to your token name
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error); // Pass to errorMiddleware
  }
});

// Error handling middleware (must be last)
app.use(errorMiddleware);

// Database connection
dbConnection(process.env.MONGO_URI);

// Start the server
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections and uncaught exceptions
process.on("unhandledRejection", (promise, reason) => {
  console.error("Unhandled Rejection:", reason);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  server.close(() => process.exit(1));
});
