const express = require("express");
const pool = require("../config/db");
const {sendVerificationMail} = require("./MailVerification")

 const addMember = async(req,res) =>{
     const {type} = req.params;
    let data,temp;

     if(type === "College Admin"){
        const {collegeCode,dname,name,email,password,hodid,id} = req.body;
        data = await pool.query('INSERT INTO department VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',[
            collegeCode,dname,name,email,password,hodid,id
        ]);
      
        temp = await pool.query('SELECT "collegeName" FROM admin WHERE "collegeCode"=$1',[collegeCode]);
        let collegeName = temp.rows[0].collegeName;
       
        sendVerificationMail(email,password,collegeCode,"HOD",collegeName,dname);
    }
    else {
    const {id,profid,collegeCode,name,dname,email,password} = req.body;

   data = await pool.query('INSERT INTO mentor VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',[
        id,profid,collegeCode,name,dname,email,password
    ]);
    temp = await pool.query('SELECT "collegeName" FROM admin WHERE "collegeCode"=$1',[collegeCode]);
    let collegeName = temp.rows[0].collegeName;
    console.log(collegeName)
    sendVerificationMail(email,password,collegeCode,"Professor",collegeName,dname);
}
// res.json(data.rows[0]);
}


module.exports = addMember