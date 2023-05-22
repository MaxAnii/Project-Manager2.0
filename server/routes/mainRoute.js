const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get('/',async(req,res)=>{
   const data = await pool.query('SELECT * FROM admin ')
   res.json(data.rows);

})



module.exports = router;