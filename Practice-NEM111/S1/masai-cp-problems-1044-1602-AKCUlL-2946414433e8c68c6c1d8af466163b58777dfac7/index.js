const http = require("http");
const fs = require("fs");
const os = require("os");
const dns = require("node:dns");
const cowsay = require("cowsay");

let userCnt = 0;
// To count the number of users 
const server = http.createServer((req, res) => {

  //Handling the home route, send an h1 tag
  
  if (req.url === "/") {
     res.setHeader("Content-type", "text/html"); 
     res.end("<h1>HOME PAGE</h1>");
  
  }
  
  //counting the number of users and writing the initial number in the logs 
  else if (req.url === "/count") {
  
  let data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
  
  // data.map((ele) => userCnt++);
  
  userCnt = data.length;
  
  fs.writeFile(
  
  "./logs.txt",
  
  `The inital user count is ${userCnt} at ${Date()}\n`, 
  (err) => {
  
  if (err) res.end(err);
  
  else res.end("The user count has been updated in the logs file");
  
  }
  );
  }
  
//   //updating the user database

else if (req.url === "/update") {
  fs.readFile("data.json", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.write("Error in reading data.json");
      res.end();
    } else {
      const users = JSON.parse(data);
      userCnt = users.length;
      const id = userCnt + Math.floor(Math.random() * 91) + 10;
      const firstName = os.userInfo().username;
      const lastName = os.userInfo().username;
      const email = "test@example.com";
      const gender = "Male";
      const newUser = {
        id,
        first_name: firstName,
        last_name: lastName,
        email,
        gender,
      };
      users.push(newUser);
      const newData = JSON.stringify(users);
      fs.writeFile("data.json", newData, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.write(`Error in writing to data.json: ${err}`);
          res.end();
        } else {
          const now = new Date();
          userCnt = users.length;
          const log = `Updated user count after adding a new user is ${userCnt} at ${now.toString()}\n`;
          fs.appendFileSync("logs.txt", log);
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.write("The data has been updated, go and check the data file");
          res.end();
        }
      });
    }
  });
}

else if (req.url === "/users"){

let users = JSON.parse(fs.readFileSync("./data.json", "utf-8")); res.setHeader("Content-type", "text/html");

res.write("Following are the users present in database:");

users.map((ele) => {

res.write(`<li>${ele.first_name}</li>`);

});

res.end();
}
//to get the websiteğurl from terminal and write its ip address and famil 

else if (req.url = "/address") {

dns.lookup("masaischool.com", (err, address, family) => {

if (err) res.end(err);

else {

fs.appendFile(

"./logs.txt",

`URL: masaischool.com IP Address: ${address} and Family is IPv${family}\n`,

(err) => {

if (err) res.end(err);

else res.end("Logs File has been updated");

}

);

}

});

}

// using the cowsay external module

else if (req.url == "/say") {

const data=fs.readFileSync("./logs.txt","utf-8");

res.end(cowsay.say({text: data}));






}

});

server.listen(4500, ()=>console.log("Server is running at port 4500"))

// Do not listen to the server just export it

module.exports = server;