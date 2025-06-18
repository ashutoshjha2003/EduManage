require('dotenv').config();
const express = require('express');
var server = express();
var routes = require('./routes.cjs');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const port=process.env.PORT || 8080;

mongoose.connect("mongodb://localhost:27017/UMS",{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

server.use(cors({
  credentials: true,
}));

server.use(cookieParser());
server.use(express.json());
server.use(routes);

server.listen(port,function check(error)
{
    if(error)
    {
        console.log("errorr")
    }
    else
    {
        console.log("startedddddd")
    }
});