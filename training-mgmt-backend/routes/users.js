const express = require("express");
const router = express.Router();
const config = require("config");
const bcrypt = require("bcryptjs");

const User = require("../models/User");


router.post("/", async (req, res) => {
    try{
        let {name, email, password, passwordCheck, role} = req.body;

        if(!name || !password || !passwordCheck || !email || !role)
            return res.status(400).json({msg: "Not entered all the required fields"});
        
        //check the existing user email

        //check the passwordcheck is equal to password or not
        if(password !== passwordCheck)
            return res.status(400).json({msg: "Enter the same password twice"});

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        
        const newUser = new User ({
            name,
            password: passwordHash,
            email,
            role,
        });

        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (err) {
        res.status(500).json({error: err.message });
    }
});

router.get("/", async (req, res) => {
    User.find()
    .then((users) => res.json(users));
});

router.get("/:_id", async (req, res) => {
    User.findById(req.params._id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: "+err));
});

module.exports = router;