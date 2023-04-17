// write the routes for /instructors end poient and add middlewares. 

const express = require("express");
const fs = require("fs");
const router = express.Router();

router.post("/addinstructor", (req, res) => {
let data = JSON.parse(fs.readFileSync("./db.json")); 
data.instructors.push(req.body); 
fs.writeFileSync("./db.json", JSON.stringify(data));
 res.send("Instructor has been added");
});

router.get("/", (req, res) => {
let data=JSON.parse(fs.readFileSync('./db.json',"utf-8"));
 res.json(data.instructors);
});

router.get("/:empID", (req, res) => {
let {empID} = req.params; 
let data=JSON.parse(fs.readFileSync('./db.json',"utf-8")); 
for (let elem of data.instructors) {
if(elem.emp_id==empID) {
res.json (elem);
}
}

});

module.exports = router;