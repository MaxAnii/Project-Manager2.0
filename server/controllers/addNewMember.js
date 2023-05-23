const express = require("express");
const pool = require("../config/db");

 const addMember = async(req,res) =>{
     const {type} = req.params;
    let data;
     if(type === "College Admin"){
        const {collegeCode,dname,name,email,password,hodid,id} = req.body;
        data = await pool.query('INSERT INTO department VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',[
            collegeCode,dname,name,email,password,hodid,id
        ]);
        
        
    }
    else {
    const {id,profid,collegeCode,name,dname,email,password} = req.body;
    console.log(id,profid,collegeCode,name,dname,email,password)
   data = await pool.query('INSERT INTO mentor VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',[
        id,profid,collegeCode,name,dname,email,password
    ]);
}
res.json(data.rows[0]);
}


module.exports = addMember