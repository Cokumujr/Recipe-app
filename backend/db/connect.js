const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/recipedb";

const connectDatabase = async () => {
  await mongoose
    .connect(connectionString)
    .then(() => console.log("The database is connected"))
    .catch((error) => console.log("Database could not be connected"));
};

module.exports = { connectDatabase }

/*
class DBConnector{
    connect = async () => {
        await mongoose
          .connect(connectionString)
          .then(() => console.log("The database is connected"))
          .catch((error) => console.log("Database could not be connected"));
      };
}

const db_connector = new DBConnector()
db_connector.connect()
*/