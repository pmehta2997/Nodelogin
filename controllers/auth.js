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

    try {
        const path=`/register/${id}`
        const temp_secret = speakeasy.generateSecret()
         db.push(path, { id, temp_secret })
        res.json({id, secret: temp_secret })
        } catch (error) {
                console.log(error)
                res.status(500).json({ message: 'Error generating the secret' })
            }
    if (!username || !role || !password || !passwordConfirm) {
            return res.status(400).json({ message: "All fields are required." });
        }
        if(password != passwordConfirm){
            return res.status(400).json({ message: "Passwords do not match." });
        }
    db.query('SELECT username FROM userroles where username = ?', [username], async (error, results) =>{
        if(error){
            console.log(error);
        }
        
        if (password.length < 6) {
            return res.status(400).json({ 
                message: "Password must be at least 6 characters." 
            });
        }
        if(results.length > 0){
            return res.status(400).json({
                message:'That username is already in use'
            });
        }
        let hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword);

    db.query('INSERT INTO userroles SET ?', {username: username, role:role, password: hashedPassword}, (error,resuts)=>{
            if(error){
                res.status(500).json({ 
                    message: "DB insert error", error: err 
                });
                console.log(error);
            }else{
                console.log(results);
                return res.status(201).json({
                     message: "User registered successfully."
                });
            }
         })
    });

    db.query('SELECT username, password FROM userroles where username = ? AND password=?', [username, password], async (error, results) =>{
    if(error){
        console.log(error);
    }
    })
}
exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please provide username and password." });
    }

    db.query("SELECT * FROM userroles WHERE username = ?", [username], async (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ 
                message: "DB error", error: err 
            });
        }

        if (!results.length || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).json({
                message: 'Incorrect username or password'
            });
        }

        req.session.userId = results[0].userid;
        req.session.username = results[0].username;
        console.log(req.session.userId);
        console.log(req.session.username);
        const token = jwt.sign({ id: results[0].userid }, 'your_jwt_secret', {
            expiresIn: '1h' });// expires in 1 hour
      
            return res.status(200).json({ 
                message: "Login successful.", user: results[0].username,token: token
        });   
        
    });
};
// Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "Logged out successfully" });
  });
};

exports.BuyerList = (req, res) => {
    console.log(req.body);


    const {username, role, password, passwordConfirm} = req.body;

    if (!username || !role || !password || !passwordConfirm) {
            return res.status(400).json({ message: "All fields are required." });
        }
        if(password != passwordConfirm){
            return res.status(400).json({ message: "Passwords do not match." });
        }
    db.query('SELECT username FROM userroles where username = ?', [username], async (error, results) =>{
        if(error){
            console.log(error);
        }
        
        if (password.length < 6) {
            return res.status(400).json({ 
                message: "Password must be at least 6 characters." 
            });
        }
        if(results.length > 0){
            return res.status(400).json({
                message:'That username is already in use'
            });
        }
        let hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword);

    db.query('INSERT INTO userroles SET ?', {username: username, role:role, password: hashedPassword}, (error,resuts)=>{
            if(error){
                res.status(500).json({ 
                    message: "DB insert error", error: err 
                });
                console.log(error);
            }else{
                console.log(results);
                return res.status(201).json({
                     message: "User registered successfully."
                });
            }
         })
    });

    db.query('SELECT username, password FROM userroles where username = ? AND password=?', [username, password], async (error, results) =>{
    if(error){
        console.log(error);
    }
    })
}

