const {faker} = require('@faker-js/faker');
const mysql = require("mysql2");

const { v4 : uuidv4 } = require('uuid');

const express = require('express');
const app = express();
const path = require("path");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));
//to pass form data
app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));



const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:"",
    password:""
})

//let q = "SHOW TABLES";

//Inserting New Data of single user
/*
let q = "INSERT INTO user(id, username, email,password) VALUES (?,?,?,?)";
let user = ["123", "rahul@123","rahul@gmail.com","abcd"];
*/

/*
//To enter two user data same time
let q = "INSERT INTO user(id, username, email,password) VALUES ?";
let users = [["123b", "rahul@123b","rahul@gmail.comb","abcdb"],
             ["123c", "rahul@123c","rahul@gmail.comc","abcdc"],
            ];

try{





app.listen("8080", ()=>{
    console.log("server is listening to 8080 port");
})