// dbConnections.js
const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => {
      console.log("Error connecting to database:", err.message);
      process.exit(1);
    });
};

exports.dbConnection = dbConnection;
