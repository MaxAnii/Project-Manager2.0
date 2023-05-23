const express = require("express");
const pool = require("../config/db");

 const addMember = async(req,res) =>{
     const {type} = req.params;
  
if(type === "College Admin"){
    const {collegeCode,dname,name,email,password,hodid,id} = req.body;
    const data = await pool.query('INSERT INTO department VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',[
        collegeCode,dname,name,email,password,hodid,id
    ]);
    res.json(data.rows[0]);
  
  
}
}


module.exports = addMember