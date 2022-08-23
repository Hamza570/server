const mongoose = require("mongoose")

const DB = process.env.DATABASE 
const port = process.env.PORT

mongoose.connect(DB).then(() =>{
    console.log("Connection Successful")
}).catch((err)=>{console.log(err)})
