const express= require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require('dotenv');

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

app.set('view engine', 'hbs');



db.connect((error) =>{
    if(error){
        console.log(error)
    }else{
        console.log("MySql Connected...")
    }
})
//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'))

app.listen(3000, ()=>{
    console.log("server started on port 3000")
})