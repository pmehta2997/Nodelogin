const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { emit } = require("process");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'userdb'
})

// Email config
const transporter = nodemailer.createTransport({
  service: "gmail", // or your SMTP provider
  auth: {
    user: "pragya2913@gmail.com",
    pass: "dmgr jfoa mxrn bgyv"
  }
});

exports.register = (req, res) => {
    console.log(req.body);

    const {username, role, password, passwordConfirm, email} = req.body;

    if (!username || !role || !password || !passwordConfirm || !email) {
            return res.status(400).json({ message: "All fields are required." });
        }
        if(password != passwordConfirm){
            return res.status(400).json({ message: "Passwords do not match." });
        }
    db.query('SELECT username FROM userroles where username = ?', [username], async (error, results) =>{
        if(error){
            console.log(error);
        }
        
        // if (password.length < 6) {
        //     return res.status(400).json({ 
        //         message: "Password must be at least 6 characters." 
        //     });
        // }
        if(results.length > 0){
            return res.status(400).json({
                message:'That username is already in use'
            });
        }
        let hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword);

    db.query('INSERT INTO userroles SET ?', {username: username, role:role, password: hashedPassword, email: email}, (error,resuts)=>{
            if(error){
                res.status(500).json({ 
                    message: "DB insert error", error: error 
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
// Login
exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password." });
    }

    db.query("SELECT * FROM userroles WHERE email = ?", [email], async (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ 
                message: "DB error", error: err 
            });
        }

        if (!results.length || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).json({
                message: 'Incorrect email or password'
            });
        }

        req.session.userId = results[0].userid;
        req.session.email = results[0].email;
        console.log(req.session.userId);
        console.log(req.session.email);
        const token = jwt.sign({ id: results[0].userid }, 'your_jwt_secret', {
            expiresIn: '1h' });// expires in 1 hour
      
            return res.status(200).json({ 
                message: "Login successful.", user: results[0].email,token: token
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
    db.query('SELECT email FROM userroles where email = ?', [email], async (error, results) =>{
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

    db.query('INSERT INTO userroles SET ?', {username: username, role:role, password: hashedPassword, email: email}, (error,resuts)=>{
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

    db.query('SELECT email, password FROM userroles where email = ? AND password=?', [email, password], async (error, results) =>{
    if(error){
        console.log(error);
    }
    })
}

// 2FA Code Generation
exports.send2FACode = (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "email required" });

  // Lookup user by email
  db.query("SELECT * FROM userroles WHERE email = ?", [email], (err, results) => {
    if (err || !results.length) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    const expires = new Date(Date.now() + 5 * 60000); // 5 minutes from now
console.log("the code is", user);
    // Save code & expiry in DB
    db.query("UPDATE userroles SET twofa_code = ?, twofa_expires = ? WHERE email = ?",
      [code, expires, email],
      (err) => {
        if (err) return res.status(500).json({ message: "DB error", error: err });

        // Send email
        const mailOptions = {
          from: "pragya2913@gmail.com",
          to: user.email,
          subject: "Your 2FA Code",
          text: `Your 2FA verification code is: ${code}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(500).json({ message: "Email send failed", error });
          }
          res.json({ message: "2FA code sent to email" });
        });
      });
  });
};

// 2FA Code Verification
exports.verify2FACode = (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) return res.status(400).json({ message: "Missing email or code" });

  db.query("SELECT * FROM userroles WHERE email = ?", [email], (err, results) => {
    if (err || !results.length) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];
    const now = new Date();

    if (user.twofa_code !== code) {
      return res.status(401).json({ message: "Invalid 2FA code" });
    }

    if (now > new Date(user.twofa_expires)) {
      return res.status(401).json({ message: "2FA code expired" });
    }

    req.session.twofa_verified = true;
    req.session.email = email;

    // Clear code from DB
    db.query("UPDATE userroles SET twofa_code = NULL, twofa_expires = NULL WHERE email = ?", [email]);

    return res.status(200).json({ message: "2FA verified" });
  });
};


