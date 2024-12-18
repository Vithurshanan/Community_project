const mongoose = require("mongoose");

exports.dbConnection = async (URI) => {
  try {
    // Use async/await to handle the connection
    const data = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      "Database connected successfully to host:",
      data.connection.host
    );
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the process with a failure code
  }
};
