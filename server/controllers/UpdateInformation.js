const pool = require('../config/db')

const updateAddedUserInformation=async(req,res)=>{
    const {type} = req.params;
   if(type ==='admin'){
const {department,name,email,hodid,id} = req.body;

await pool.query('UPDATE department SET "dname"=$1, "name"=$2, "email"=$3, "hodid"=$4 WHERE  "id"=$5',[
    department,name,email,hodid,id
])  }

else{
    const {name,email,profId,id} = req.body;
    await pool.query('UPDATE mentor SET "name"=$1, "email"=$2, "profId"=$3 WHERE  "id"=$4',[
        name,email,profId,id
    ]) 
}

}

const updatePersonalInformation=async (req,res)=>{
   try {
    const {type}=req.params;
    if(type === 'admin'){
        const {collegeName,collegeCode,email,password,id} = req.body;
        console.log(req.body)
        await pool.query('UPDATE admin SET "collegeName"=$1,"collegeCode"=$2,"email"=$3,"password"=$4 WHERE "id"=$5' ,[
            collegeName,collegeCode,email,password,id
        ])
    }
   } catch (error) {
    console.log(error)
   }

}




module.exports = {updateAddedUserInformation,updatePersonalInformation}