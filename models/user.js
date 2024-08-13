const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type:String, 
            requied: true,
            unique: true
        },
        email:{
            type:String,
            requied: true,
            unique: true
        },
        password:{
            type: String,
            requied: true
        },
        isAdmin:{
            type: Boolean,
            default:false
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);