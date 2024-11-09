const express=require('express')

const APP_SERVER=express();

APP_SERVER.use("/api",require("./Router/useroute"));
APP_SERVER.use("/api",require('./Router/messageroute'))

module.exports=APP_SERVER;