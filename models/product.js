const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type:String, 
            requied: true,
            unique: true
        },
        description:{
            type:String,
            requied: true,
        },
        image:{
            type: String,
            requied: true
        },
        categories:{
            type: Array,
        },
        size:{
            type: String,
        },
        color:{
            type: String,
        },
        price:{
            type: String,
            requied: true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Product", ProductSchema);