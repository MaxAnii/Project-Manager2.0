const express = require("express");
const pool = require("../config/db");

 const newUserSignUp=async(req,res)=>{
    const {type} = req.params
   if(type === 'collegeAdmin'){
      const {id,collegeName,collegeCode,email,password}=req.body
      const data = await pool.query('INSERT INTO admin VALUES ($1,$2,$3,$4,$5) RETURNING * ',
      [id,collegeName,collegeCode,email,password])
   }
}

 const checkUserExist =async(req,res)=>{
    const {type} = req.params;
    if(type === 'collegeAdmin'){
        
        const data = await pool.query('SELECT * FROM admin')
        res.json(data.rows);
     }
}
module.exports = checkUserExist
