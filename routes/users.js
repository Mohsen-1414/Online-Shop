const router = require('express').Router();
const User = require('../models/user');
const {verifyToken, verifyTokenAndAuthorization} = require('./verifyToken');

router.put('/:id', verifyTokenAndAuthorization, async (req, res) =>{
    if(req.body.password ){
        req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:req.body
        }, {new:true});
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;