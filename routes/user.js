const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("../routes/verifyToken");

//register 
router.post("/register", async  (req,res) => {
    // checking user id in DB
    const emailExists = await User.findOne({
        email: req.body.email
    })
    if(emailExists) return res.status(400).send("Email already exists");
    
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    
    // create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        dob: req.body.dob,
        phone: req.body.phone,
        password: hashedPassword
    });
    try{
        const savedUser = await  user.save();
        res.send(savedUser);
    }catch(error){
        res.status(400).send(error);
    }
});


// user login
router.post("/login", async (req,res)=>{
    // checking user email in db
    const user = await User.findOne({email: req.body.email})

    if(!user) return res.status(400).send("Email is wrong");
    // checking password
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send("Password Incorrect");

    // create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token",token).send({token:token});
});


// get all the registered users
router.get("/getusers",verify,async (req,res) =>{
    try{
        const users = await User.find();
        res.json(users);
    } catch(error) {
        res.json({ message: error })
    }
});

// get specific user by id
router.get("/getusers/:userId",verify, async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res.json(user);
    } catch (error) {
        console.log("ma hu kunal");
      res.json({ message: error });
    }
  });

module.exports = router;