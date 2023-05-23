require ('dotenv').config();

const express = require("express");
const checkRoute = require('./routes/mainRoute')
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.json());


app.use(checkRoute)






app.listen(5000,()=>{
    console.log("server is alive")
})