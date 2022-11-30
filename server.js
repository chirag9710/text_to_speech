const app = require("./app");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
  console.log(err.message, err.name);
  process.exit(1);
});

const DB = "mongodb+srv://cluster0.sjzxt0e.mongodb.net/";

mongoose
  .connect(DB, {
    // useCreateIndex: true,
    // useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("DB connected successfully");
  });

const port = 3000;

const server = app.listen(port, () => {
  console.log("Server is up listening on port:" + port);
});