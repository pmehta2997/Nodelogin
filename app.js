const express= require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config({ path: './.env'

})

const app = express();//start server

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'userdb'
})

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(session({
  secret: '0d49c260e429bbf33c53394e7e8cbb5803d582de4246998de95e03908448d768fb606cb833967579a93bbeb6465ffb8ba03150225bd5fb17dd9d52e087f7276c',
  resave: false,
  saveUninitialized: false
}));


// Protected Test Route
const  isAuthenticated  = require('./middleware/authMiddleware');
const isAdmin = require('./middleware/authMiddleware');
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.send(`Welcome ${req.session.username}, your role is ${req.session.role}`);
});

app.get('/admin', isAuthenticated, isAdmin, (req, res) => {
  res.send("Admin access granted");
});
app.set('view engine', 'hbs');



db.connect((error) =>{
    if(error){
        console.log(error)
    }else{
        console.log("MySql Connected...")
    }
})
//define routes
//app.use('/', require('./routes/pages'));
//app.use('/auth', require('./routes/auth'))


// Routes
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/userRoutes"));

// API test route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});


app.listen(3000, ()=>{
    console.log("server started on port 3000")
})