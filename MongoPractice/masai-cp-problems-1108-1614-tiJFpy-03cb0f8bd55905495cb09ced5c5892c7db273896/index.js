// create the express app and export it.
const express = require("express"); 
const fs = require("fs");
const studentRoute= require("./routes/student.route");
const instructorRoute= require("./routes/instructor.route");
const app = express();
const path=require('path')
// const morgan = require( 'morgan')
app.use(express.json());
const logger=require('./middleware/logger.middleware')
app.use(logger)
app.use("/students", studentRoute);
app.use("/instructors", instructorRoute);
//app.listen(8000)
module.exports = app;