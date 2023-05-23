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

 const checkUserDetailsAlreadyExist =async(req,res)=>{
   
   
     const {type} = req.params;
    
        const data = await pool.query('SELECT * FROM admin')
        res.json(data.rows);
     
}

const login =async(req,res)=>{
   const {collegeCode,email,password,designation} = req.params;
   let data
   if(designation=== 'College Admin'){
    data = await pool.query('SELECT * FROM admin WHERE "collegeCode"=$1 AND "email"=$2 AND "password"=$3',[
         collegeCode,email,password
      ]);
   }
   else if(designation=== 'HOD'){
      data = await pool.query('SELECT * FROM department WHERE "collegeCode"=$1 AND "email"=$2 AND "password"=$3',[
           collegeCode,email,password
        ]);
     }
     else if(designation=== 'Professor'){
      data = await pool.query('SELECT * FROM mentor WHERE "collegeCode"=$1 AND "email"=$2 AND "password"=$3',[
           collegeCode,email,password
        ]);
     }

   res.json(data.rows);

}


module.exports = {newUserSignUp,checkUserDetailsAlreadyExist,login}
