require('dotenv').config();
const router = require('express').Router();
const User = require('../models/user');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');


/////////////////////////////////////////////// Register ///////////////////////////////////////////////////////////


router.post('/register', async (req, res) =>{
    const newUser = new User({
        username: req.body.username,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString(),
        email: req.body.email,
    });

    try {
        const savedUser = await newUser.save();
        res.send(savedUser);
    } catch (error) {
        console.log(error)
    };
});


/////////////////////////////////////////////// Login ///////////////////////////////////////////////////////////

router.post('/login', async (req,res) =>{
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user){
            res.status(401).json("There is no username by this details!");
        }
        const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.PASSWORD_SECRET);
        const mainPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
        if (mainPassword !== req.body.password) {
            res.status(401).json("Incorrect details");
        }

        const accessToken = jwt.sign({id:user._id, isAdmin: user.isAdmin},process.env.PASSWORD_SECRET, {expiresIn:"2d"} );

        const { password, ...others} = user._doc; // we did this so that we can skip showing the password

         res.status(200).json({others, accessToken});
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;