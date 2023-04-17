// write the routes for /students end poient and add middlewares. 
const express = require("express");
const router = express.Router();
const fs = require("fs");
const {validator} = require("../middleware/validator.middleware")

router.get("/", (req, res) => {
let data = JSON.parse(fs.readFileSync("./db.json"));
 res.send(data.students);
});

router.get("/:studentCode", (req, res) => { 
    let {studentCode}= req.params;
let data= JSON.parse(fs.readFileSync("./db.json"));
for (let i=0; i < data.students.length; i++) {
if (data.students[i].student_code == studentCode) {
     res.send(data.students[i]);
}
}
});

router.post("/addstudent", (req, res) => {
    let data = JSON.parse(fs.readFileSync("./db.json")); 
    data.students.push(req.body);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send("Student has been added");
    });

    router.delete("/:studentCode", validator, (req, res) => {
    const {studentCode} = req.params 
    const data = JSON.parse(fs.readFileSync('./db.json'))
    const students = data.students.filter(ele => ele.student_code!=studentCode)
    data.students = students
    fs.writeFileSync('db.json', JSON.stringify(data))
    res.send('Deleted Student Details')
    });

    router.patch("/:studentCode", validator, (req, res) => {
        let {studentCode}=req.params;
        let data=JSON.parse(fs.readFileSync('./db.json', "utf-8"));
        let newdata= data.students.map(elem=>{ 
        if(elem.student_code==studentCode) {
        elem.name= req.body.name;
        elem.location = req.body.location;
        elem.batch = req.body.batch;
        return elem
        }else{
        return elem
        }
        })
        data.students=newdata;
        fs.writeFileSync('./db.json', JSON.stringify(data));
         res.send("Patched Student Details")
        });

        module.exports = router ;