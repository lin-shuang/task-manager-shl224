/*
Author: Shuang Lin
Email: shl224@lehigh.edu
*/

//Server Program //////////////////////////////////////////////////////////

const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

//vars
let rows = "";
let counter = 0;
class task{
    constructor(count, desc, type, date){
        this.count = count;
        this.desc = desc;
        this.type = type;
        this.date = date;
    }
}
let taskList = [];

//Set up parsers
app.use(bodyParser.json()); //parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //parsing application/x-www-form-urlencoded

//Set up routers
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname)); //for css linking

//Router empty, default
app.get("/", function (req, res) {

  //redirect to load
  res.render("taskManager.ejs", {
    url: '/load'
  });
});

//Router load
app.get("/load", function (req, res) {

  buildList(); //build list of rows

  //send to browser's ajax success call
  res.end(rows);
});

//Router Add
app.get("/add", function (req, res) {

  //if valid input
  if(req.query.desc && req.query.type && req.query.date){
    taskList[counter] = new task(counter++, req.query.desc, req.query.type, req.query.date);
    buildList();
  }
  else{
    console.log("Error in add");
  }

  //send to browser's ajax success call
  res.end(rows);
});

//Route delete
app.get("/delete", function (req, res) {

  //if valid input
  if(req.query.indices){

    let indices = req.query.indices;
    //delete specified tasks in the tasksList array
    for(let i = 0; i < indices.length; i++){
      if(i == 0){
        //deletes first item at their index
        taskList.splice(indices[i], 1);
      }
      else if(i > 0){
        //deletes other items at their index, -i because array shortens
        taskList.splice(indices[i]-i, 1);
      }
      counter--;
    }
    buildList();
  }
  else{
    console.log("Error in delete");
  }

  //send to browser's ajax success call
  res.end(rows);
});

//listen on port number
app.listen(3000);

//Functions //////////////////////////////////////////////////////////

function buildList(){
  //empty then rebuild list
  rows = "";
  for(let i = 0; i < taskList.length; i++){
    rows += "<tr>"+
      "<td><input type='checkbox' id='"+i+"'></td>"+
      "<td>"+taskList[i].desc+"</td>"+
      "<td>"+taskList[i].type+"</td>"+
      "<td>"+taskList[i].date+"</td>"+
    "</tr>";
  }
}