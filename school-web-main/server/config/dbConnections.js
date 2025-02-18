const mongoose = require("mongoose");

exports.dbConnection = async (URI) => {
  try {
    // Only include the necessary options
    const options = {
      useNewUrlParser: true,  // Avoid deprecation warnings for URL parser
      useUnifiedTopology: true,  // Avoid deprecation warnings for topology engine
    };

    // Await the mongoose.connect() method to ensure it resolves before proceeding
    const data = await mongoose.connect(URI, options);
    console.log("Database connected successfully to host", data.connection.host);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);  // Exit the process if there's an error
  }
};
