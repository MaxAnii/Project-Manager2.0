const express = require("express");
const pool = require("../config/db");

 const newUserSignUp=async(req,res)=>{ 
   
   const{desgination} = req.body;
   if(desgination ==='College Admin' ){
       const {id,collegeName,collegeCode,email,password}=req.body
      
      const data = await pool.query('INSERT INTO admin VALUES ($1,$2,$3,$4,$5) RETURNING * ',
      [id,collegeName,collegeCode,email,password]);
      res.json(data.rows[0])
   }
}

 const checkUserExist =async(req,res)=>{
   
   
     const {type} = req.params;
     console.log(type)
        const data = await pool.query('SELECT * FROM admin')
        res.json(data.rows);
     
}




module.exports = {newUserSignUp,checkUserExist}
