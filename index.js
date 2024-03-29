const express = require('express');
const clc = require('cli-color');
require('dotenv').config();
const session = require('express-session')
const mongoDbSession = require('connect-mongodb-session')(session);

// File imports 
const db = require("./db");
const AuthRouter = require("./Controllers/AuthController");

// constants 
const app = express();
const PORT = process.env.PORT;
const store = new mongoDbSession({
    uri : process.env.MONGO_URI,
    collection : "sessions"
})

// middleware
app.use(express.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
}))

//routes
//      /auth/check , /auth/register
app.use("/auth", AuthRouter);

app.listen(PORT, ()=>{
    console.log(clc.yellowBright("Server is running at:"));
    console.log(clc.yellowBright.bold.underline(`http://localhost:${PORT}`));
});