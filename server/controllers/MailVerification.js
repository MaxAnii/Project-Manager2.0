const nodemailer = require('nodemailer');
const pool = require('../config/db');
const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{      
        user:"ansarbaba2000@gmail.com",
        pass:"axlazbsphpemsklg" 
    },
});
const mailOptional={
    from:"ansarbaba2000@gmail.com",
    to:"ansarbaba199@gmail.com",
    subject:"this is testing email",
    html:'<h1> Testing is Tested,</h1>',
}

// transport.sendMail(mailOptional,(error,info)=>{
//     if(error) console.log('error',error)
//     else console.log("success")
// })




const forgetPasswordMail = async(req,res)=>{
    const {designation,collegeCode,email} = req.body;
    let data;
    if(designation === 'College Admin'){
        data = await pool.query('SELECT * FROM admin WHERE "email"$1,"collegeCode"=$2',[email,collegeCode]);
    }
    else if(designation === 'HOD'){
        data = await pool.query('SELECT * FROM department WHERE "email"=$1, collegeCode"=$2 ',[email,collegeCode]);
    }
    else if(designation === 'professor'){
        data = await pool.query('SELECT * FROM mentor  WHERE "email"=$1, collegeCode"=$2 ',[email,collegeCode]);
    }
    else {
        data = await pool.query('SELECT * FROM student  WHERE "email"=$1, collegeCode"=$2 ',[email,collegeCode]);
    }
    if(data){
        
    }
}








 module.exports = forgetPasswordMail
