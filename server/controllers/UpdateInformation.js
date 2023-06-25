const pool = require('../config/db')
const {sendVerificationMail} = require('./MailVerification')

const updateAddedUserInformation=async(req,res)=>{
    const {type} = req.params;
try {
    if(type ==='admin'){
        const {department,name,email,hodid,id} = req.body;
        
        await pool.query('UPDATE department SET "dname"=$1, "name"=$2, "email"=$3, "hodid"=$4 WHERE  "id"=$5',[
            department,name,email,hodid,id
        ]) 
        const data = await pool.query('SELECT department."password", department."collegeCode", admin."collegeName" FROM department,admin WHERE department."id"=$1 AND department."collegeCode" = admin."collegeCode"',[id]);
        const password = data.rows[0].password;
        const collegeCode = data.rows[0].collegeCode;
        const collegeName = data.rows[0].collegeName; 
        sendVerificationMail(email,password,collegeCode,"HOD",collegeName,department);
        }
        
        else{
            const {name,email,profId,id} = req.body;
            await pool.query('UPDATE mentor SET "name"=$1, "email"=$2, "profId"=$3 WHERE  "id"=$4',[
                name,email,profId,id
            ])
            const data = await pool.query('SELECT mentor."password", mentor."collegeCode", admin."collegeName" FROM mentor,admin WHERE mentor."id"=$1 AND mentor."collegeCode" = admin."collegeCode"',[id]);
        const password = data.rows[0].password;
        const collegeCode = data.rows[0].collegeCode;
        const collegeName = data.rows[0].collegeName; 
        sendVerificationMail(email,password,collegeCode,"Professor",collegeName,department); 
        }
} catch (error) {
    console.log("error")
}

}

const updatePersonalInformation=async (req,res)=>{
   try {
    const {type}=req.params;
    if(type === 'admin'){
        const {collegeName,collegeCode,email,password,id} = req.body;
     
        await pool.query('UPDATE admin SET "collegeName"=$1,"collegeCode"=$2,"email"=$3,"password"=$4 WHERE "id"=$5' ,[
            collegeName,collegeCode,email,password,id
        ])
    }
    else if(type === 'department'){
        const { name,email,password,hodid,id}= req.body
        await pool.query('UPDATE department SET "name"=$1,"hodid"=$2, "email"=$3,"password"=$4 WHERE "id"=$5' ,[
            name,hodid,email,password,id
        ])
    }
    else if(type === 'mentor'){
        const { name,email,password,profId,id}= req.body
        await pool.query('UPDATE mentor SET "name"=$1,"profId"=$2, "email"=$3,"password"=$4 WHERE "id"=$5' ,[
            name,profId,email,password,id
        ])
    }
    else {
        const { name,email,password,studentId,year,id}= req.body
        await pool.query('UPDATE student SET "name"=$1,"studentId"=$2, "email"=$3,"password"=$4,"year"=$5 WHERE "id"=$6' ,[
            name,studentId,email,password,year,id
        ])
    }
   } catch (error) {
    console.log(error)
   }

}


const updatePassword=async(req,res)=>{
    const {desgination,id,password} = req.body;
  
    let data
  
    try {
        if(desgination === 'Student'){
            data= await pool.query('UPDATE student SET  "password"=$1 WHERE "id"=$2 RETURNING *' ,[
                 password,id
             ])
         }
         else if(desgination === 'HOD'){
            data= await pool.query('UPDATE department SET  "password"=$1 WHERE "id"=$2 RETURNING *' ,[
                 password,id
             ])
         }
        else if(desgination === 'College Admin'){
            data= await pool.query('UPDATE admin SET  "password"=$1 WHERE "id"=$2 RETURNING *' ,[
                 password,id
             ])
         }
         else{
            data= await pool.query('UPDATE mentor SET  "password"=$1 WHERE "id"=$2 RETURNING *' ,[
                 password,id
             ])
     
         }
         res.json(data.rows[0]);
    } catch (error) {
        console.log(error)
    }

}



module.exports = {updateAddedUserInformation,updatePersonalInformation,updatePassword}