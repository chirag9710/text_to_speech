// Calling all the required packages
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Configurations for "body-parser"
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Configurations for setting up ejs engine &
// displaying static files from "public" folder
// TO BE ADDED LATER

// Routes will be added here later on

//Express server
module.exports = app;