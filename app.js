const dotenv = require("dotenv")
const mongoose = require("mongoose")
const path = require("path")
const express = require('express')
const nav = express()
const cors = require('cors')
dotenv.config({path:'./config.env'})
require('./db/conn')


nav.use(cors())
nav.use(express.json())
const port = process.env.PORT

nav.use(require('./router/auth'))

const authentication = (req,res,next) =>{
    console.log("Midlleware here")
    next()
}

nav.listen(port,()=>{
    console.log(`Working on PORT :${port}`)
})