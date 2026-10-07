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





app.listen("8080", ()=>{
    console.log("server is listening to 8080 port");
})