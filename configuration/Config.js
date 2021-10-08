const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return console.log("db connected");
  } catch (error) {
    return console.log(error);
  }
};

module.exports = connection;
