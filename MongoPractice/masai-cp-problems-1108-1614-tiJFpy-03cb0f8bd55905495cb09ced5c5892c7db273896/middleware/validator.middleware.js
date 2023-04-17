
// write the logic for validation middleware.

const express = require("express");
const fs = require("fs");

function validator(req, res, next) {
const {pass, role} = req.query
if(pass==7877 && (role== "admin" || role=='instructor')){
next()
}else{
return res.send('You are not authorised to do this operation', pass, role)
}
}
module.exports ={validator}