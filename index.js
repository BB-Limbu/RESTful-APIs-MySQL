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

    //Name  query to run any query in a database query like "SHOW TABLES"
    //In actual result is an array it print different object.single user only user
connection.query(q,[users], (err, result) =>{
    if(err) throw err;
    console.log(result);
    // console.log(result.length);
    // console.log(result[0]);
    // console.log(result[1]);
})
}catch(err){
    console.log(err);
}

connection.end();

*/

/*
const getRandomUser = ()=> {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
  */



//<========================================================================>
//Insert data in Bulk Using faker
const getRandomUser = ()=> {
  return [
     faker.string.uuid(),
     faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
];
}


/*
//Inserting data into table
let q1 = "INSERT INTO user(id, username, email,password) VALUES ?";

let data = [];
for(let i = 1; i <= 100; i++){
    data.push(getRandomUser()); // 100 fake users
}
try{
    connection.query(q1, [data], (err, result) =>{
        if(err) throw err;
        console.log(result);
    })
}catch(err){
    console.log(err);
}

connection.end();
*/

//Fetch and show total number of users on our app
app.get("/", (req, res) =>{
    let q = `SELECT count(*) FROM user`;

    try{
        connection.query(q, (err, result) =>{
            if(err) throw err;
           let count = result[0]["count(*)"];
            res.render("home.ejs", {count});
        })
    }catch(err){
        console.log(err);
        res.send("Some error in DB");
    }
})


//Show route that bring all data from database on display
app.get("/user", (req, res) =>{
    //This is query
    let q = `SELECT * FROM user`

    try{
        connection.query(q, (err, users) =>{
            if(err) throw err;
            //console.log(user);
            //res.send(user);
            res.render("showusers.ejs", {users})
        })
    }catch(err){
        console.log(err);
        res.send("Some error in DB");
    }
    
})

//Edit Route only edit form
app.get("/user/:id/edit", (req, res) =>{
    let {id} = req.params;
    //Query find id in database
    let q = `SELECT * FROM user WHERE id = '${id}'`;

    try{
        connection.query(q, (err, result) =>{
            if(err) throw err;
            let user = result[0];
            res.render("edit.ejs", {user});
        })
    }catch(err){
        console.log(err);
        res.send(err);
    }
    
});

//Update Route in database
app.patch("/user/:id",(req, res)=>{
    let {id} = req.params;
    let {password : formPassword, username:newUsername} = req.body;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let user = result[0];
            if(formPassword != user.password){
                res.send("wrong password");
            }else{
                //update query to update username
                let q2 = `UPDATE user SET username='${newUsername}' WHERE id = '${id}'`;
                connection.query(q2, (err, result) =>{
                    if(err) throw err;
                    res.redirect("/user");
                });
            };
            
        });
    }catch(err){
        console.log(err);
        res.send("some error in DB");
    }
})




app.get("/user/new",(req, res) =>{
    //console.log(req);
    res.render("new.ejs");
})


//Add new post
app.post("/user/new", (req, res) =>{
    let {username, email, password} = req.body;
    let id = uuidv4();
    //Query to Insert New User
    let q = `INSERT INTO user (id, username,email, password) values('${id}', '${username}', '${email}', '${password}')`;

    try{
        connection.query(q, (err, result) =>{
            if(err) throw err;
            res.redirect("/user");
        })
    }catch(err){
        res.send("some error occurred");
    }
})



//Delete route
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id ='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      //res.render("delete.ejs", { user });
      res.render("delete.ejs", {user});
    });
  } catch (err) {
    res.send("some error with DB");
  }
});



app.delete("/user/:id", (req, res)=>{
    let {id} = req.params;
    let { password: formPassword } = req.body;
    let q = `SELECT * FROM user WHERE id = '${id}'`;

    try{
        connection.query(q, (err, result) =>{
            if(err) throw err;
            let user = result[0];
            if(formPassword != user.password){
                res.send("wrong password");
            }else{
                let q2 = `DELETE FROM user WHERE id ='${id}'`; //Query to Delete
                connection.query(q2, (err, result) =>{
                    if(err) throw err;

                    else{
                        // console.log(result);
                        // console.log("deleted!");
                     res.redirect("/user");
                    }
                })
            }
        })
    }catch(err){
        res.send("some error in database");
    }
})



app.listen("8080", ()=>{
    console.log("server is listening to 8080 port");
})