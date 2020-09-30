const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); //Allows Mongo Atlas connection

//So we can have env variables
require("dotenv").config();

//For the express server
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
//Allows to parse json
app.use(express.json());

const uri = process.env.ATLAS_URI; //Gets the uri
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }); //Because of big update thingy
mongoose.connection.once("open", () => {
  console.log("Mongo Ready ;)");
});

//for getting the endpoints
const exercisesRouter = require("./routes/exercises");
const userRouter = require("./routes/users");
//for setting up endpoints
app.use("/exercises", exercisesRouter);
app.use("/users", userRouter);

//Starts the server
app.listen(port, () => {
  console.log(`Server os running on port:${port}`);
});
