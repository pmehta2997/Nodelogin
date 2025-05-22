const express = require("express");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/admin', verifyToken, (req,res) =>{
    res.json({message:"welcome admin"});
})

router.get('/user', (req,res) =>{
    res.json({message:"welcome user"});
})

router.get('/buyer', (req,res) =>{
    res.json({message:"welcome buyer"});
})
module.exports = router;