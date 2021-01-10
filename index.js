const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const fs = require('fs')
const url = require('url');

const db = []

app.use(express.static("public"));
app.use(express.static("packages"));
app.use(express.static("Data"));
app.use(bodyParser.json());

app.get("/", (request, response) => {
   response.sendFile(__dirname + "/QR.html");
});

app.use(function (err, req, res, next) {
   console.error(err.stack)

})

app.get("/users", (request, response) => {
   response.sendFile(__dirname + "/user.html");
   var getUrl = request.url.split(/\/users\?user=/g).join(' ').slice(1)
   console.log(getUrl)

   
   // if (response.status(500)) {
   //    return response.send('QR User Not Found!')
   // } else {
   const sad = require(`./Data/${getUrl}.json`)
   // var stats = fs.lstatSync(`/Data/${getUrl}`)
   // if (stats.isDirectory()) {
   app.post("/NewData", function (req, res) {

      sad.push(req.body.user.name)
      fs.writeFileSync(`./Data/${getUrl}.json`, JSON.stringify(sad, null, 4))
   });
   app.get("/sad", (reqq, ress) => {
      ress.sendFile(__dirname + `/${getUrl}.json`);
      ress.json(sad);
   });
   // }
   // }
});


app.post("/users", function (request, response) {
   console.log(request.body.user.name);
   var pathURL = `/users?user=${request.body.user.name}`
   try {
      if (fs.existsSync(`./Data/${request.body.user.name}.json`)) {
         response.redirect(pathURL)
      } else {
         console.log('yes2')

         var newUser = []
         fs.writeFileSync(`./Data/${request.body.user.name}.json`, JSON.stringify(newUser, null, 4))
      }
   } catch (error) {
      console.log(error)
   }
});




const listener = app.listen("3000", () => {
   console.log("app is listening on port " + listener.address().port);
});

