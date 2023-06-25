const express = require("express");
const pool = require("../config/db");
const jwt = require("jsonwebtoken")


 const newUserSignUp=async(req,res)=>{ 
   const{desgination} = req.body;
   let data;
  try {
   if(desgination ==='College Admin' ){
      const {id,collegeName,collegeCode,email,password}=req.body
     data = await pool.query('INSERT INTO admin VALUES ($1,$2,$3,$4,$5) RETURNING * ',
      [id,collegeName,collegeCode,email,password]);
     
     }
     else{
     const {id,studentId,name,email,password,collegeCode,year,dname}=req.body
    data = await pool.query('INSERT INTO student VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * ',
     [id,studentId,name,email,password,collegeCode,year,dname]);
  }
  if(data.rows.length !== 0)
  {  
    const token = jwt.sign(data.rows[0],process.env.jsonKey,{
      expiresIn:1200000,
    })
  
  data.rows[0].JToken = token;
  res.json(data.rows[0])
  } 

  } catch (error) {
   console.log(error)
  }
}

const departmentListAndCollegeName =async(req,res)=>{


   const {collegeCode} = req.params;

try {
   const data = await pool.query('(SELECT a."collegeName", "dname" FROM admin a, department d WHERE a."collegeCode" = $1 AND d."collegeCode"  =$1) ORDER BY "dname" ASC',
   [collegeCode]);

   res.json(data.rows);

} catch (error) {
   console.log(error)
}
}



 const checkUserDetailsAlreadyExist =async(req,res)=>{
     const {type} = req.params;
     const {collegeCode,email} = req.body;
     let data;
    try {
      if(type == 'college Admin'){
       data = await pool.query('SELECT * FROM admin WHERE "collegeCode"=$1 AND "email"=$2',[
            collegeCode,email
         ])
      }
      else{
         data = await pool.query('SELECT * FROM student WHERE "collegeCode"=$1 AND "email"=$2',[
            collegeCode,email
         ])
      }
      res.json(data.rows);
    } catch (error) {
      console.log(error)
    }
}




const login =async(req,res)=>{
   const {collegeCode,email,password,desgination} = req.body;

   let data
try {
   if(desgination=== 'College Admin'){
      data = await pool.query('SELECT * FROM admin WHERE "collegeCode"=$1 AND "email"=$2 AND "password"=$3',[
           collegeCode,email,password
        ]);
     }
     else if(desgination=== 'HOD'){
        data = await pool.query('SELECT * FROM department WHERE "collegeCode"=$1 AND "email"=$2 AND "password"=$3',[
             collegeCode,email,password
          ]);
       }
       else if(desgination=== 'Professor'){
        data = await pool.query('SELECT * FROM mentor WHERE "collegeCode"=$1 AND "email"=$2 AND "password"=$3',[
             collegeCode,email,password
          ]);
        }
        else{
          data = await pool.query('SELECT * FROM student WHERE "collegeCode"=$1 AND "email"=$2 AND "password"=$3',[
               collegeCode,email,password
            ]);
  
       }
       if(data.rows.length !== 0)
  {  
    const token = jwt.sign(data.rows[0],process.env.jsonKey,{
      expiresIn:1200000,
    })

  data.rows[0].JToken = token;
  res.json(data.rows[0])
  } 

} catch (error) {
   console.log(error)
}

}


module.exports = {newUserSignUp,checkUserDetailsAlreadyExist,login,departmentListAndCollegeName}
