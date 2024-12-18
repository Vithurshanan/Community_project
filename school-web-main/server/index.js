const path = require('path');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookie = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

const Enrollment = require("./routes/Enrollment");
const UserRoute = require("./routes/UserRoute");
const AdminRoute = require("./routes/adminRoutes");
const { dbConnection } = require("./config/dbConnections");
const error = require("./middlewares/error");

// Load environment variables
dotenv.config();

// Debugging: Check if environment variables are loaded
console.log("MONGO_URI:", process.env.URI);
console.log("PORT:", process.env.PORT);
console.log("CLOUDINARY_NAME:", process.env.CLOUDINARY_NAME);

// CORS Options
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

// Middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(fileUpload());
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cookie());
app.use(cors(corsOptions));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Routes
app.use("/api", UserRoute);
app.use("/api", Enrollment);
app.use("/api/admin", AdminRoute);
app.use(error);

// Static file for sitemap
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

// Database connection
const URI = process.env.URI || "mongodb://localhost:27017/fallback-db"; // Fallback in case `URI` is undefined
dbConnection(URI);

// Start the server
const PORT = process.env.PORT || 4000; // Default to 4000 if `PORT` is undefined
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  console.log("Shutting down server due to unhandledRejection");
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Error:", err.message);
  console.log("Shutting down server due to uncaughtException");
  server.close(() => process.exit(1));
});
