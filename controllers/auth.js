const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'userdb'
})

exports.register = (req, res) => {
    console.log(req.body);


    const {username, role, password, passwordConfirm} = req.body;

    db.query('SELECT username FROM userroles where username = ?', [username], async (error, results) =>{
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            return res.render('register',{
                message:'That username is already in use'
            });
        }else if(password != passwordConfirm){
            return res.render('register',{
                message:'Passwords do not match'
            });
        }
        let hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword);

    db.query('INSERT INTO userroles SET ?', {username: username, role:role, password: hashedPassword}, (error,resuts)=>{
            if(error){
                console.log(error);
            }else{
                console.log(results);
                return res.render('register',{
                    message: 'User registered.'
                });
            }
         })
    });

    db.query('SELECT username, password FROM userroles where username = ? AND password=?', [username, password], async (error, results) =>{
    if(error){
        console.log(error);
    }
    })
    //res.send("form submitted");
}
// exports.login("/login", (req, res) => {
//     const { username, password } = req.body;

//     db.query("SELECT * FROM userrole WHERE username = ?", [username], async (err, results) => {
//         if (!results.length || !(await bcrypt.compare(password, results[0].password))) {
//             return res.send("Incorrect email or password");
//         }
//         res.send("Logged in successfully!");
//     });
// });
exports.login = (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM userroles WHERE username = ?", [username], async (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }

        if (!results.length || !(await bcrypt.compare(password, results[0].password))) {
            return res.render('login', {
                message: 'Incorrect username or password'
            });
        }

        res.render('login', {
            message: 'Logged in successfully!'
        });
    });
};
