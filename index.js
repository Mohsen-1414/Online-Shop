require('dotenv').config();
const express = require('express');
//const db = require('./database/dbConfig');
const mongoose = require('mongoose');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');


const app = express();

app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
    .then(() =>{
        console.log('Databse is connected !')
    })
    .catch(() =>{
        console.log('Database is not connected !')
    });

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);


const port = process.env.PORT || 5050;


app.listen(port, ()=>{
    console.log(`we are live on port ${port}`);
})