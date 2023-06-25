const transport = require('../config/mail')
const pool = require('../config/db');

const sendVerificationMail=(email,password,collegeCode,designation,collegeName,department)=>{
const mailOptional={
    from:process.env.email,
    to:email,
    subject:"Registration Confirmation: Project Manager",
    html:`
    <h1>Welcome to Project Manager</h1>
    <br>
    <p>
 
<h4>
   This mail is to inform you about the recent registration of your email address with the Project Manager as ${designation} for the ${department} department at ${collegeName} with the college code ${collegeCode}. This software will facilitate efficient project management within the department and enable streamlined communication and collaboration among the faculty members.</h4>
    
  <h3>  Here are the details of your account registration:</h3>
    <h2>
    
    
    Email Address: ${email}
    <br>
    Desgination:${designation}
    <br>
    Department: ${department}
    <br>
    College Name: ${collegeName}
    <br>
    College Code: ${collegeCode}
    <br>
    Password: ${password}
    <br>
    
    </h2>
    Please note that the provided password is temporary. For security reasons, we strongly recommend changing it upon your first login. You can update your password by following the instructions provided within the software.
    </p>`
}
transport.sendMail(mailOptional,(error,info)=>{
    if(error) console.log('error',error)
    else console.log("success")
})
}





const sendOTP= (email,otp)=>{

    const mailOptional={
        from:"projectmanager634@gmail.com",
        to:email,
        subject:"Reset Password email",
        html:`<h1> Rest your Project Manager password</h1><p>
        We heard that you lost your Project Manager password. Sorry about that!
But don’t worry!  we have generated a One-Time Password (OTP) for you to use during the password reset process.
        </p>
        <h4> Please find below your OTP:</h4>
        <h2>OTP: ${otp} </h2>
<br>
<p>Thank you for your attention to this matter. We appreciate your continued support and trust in our Project Manager Software.</p>`,
    }
    transport.sendMail(mailOptional,(error,info)=>{
        if(error) console.log('error',error)
        else console.log("success")
    })
}


const forgetPasswordMail = async(req,res)=>{
    const {desgination,collegeCode,email} = req.body;
 
    let data
  try {
    if(desgination === "College Admin"){
     
        data = await pool.query('SELECT * FROM admin WHERE "email"=$1 AND "collegeCode"=$2',[email,collegeCode]);
    }
    else if(desgination === "HOD"){
        data = await pool.query('SELECT * FROM department WHERE "email"=$1 AND "collegeCode"=$2',[email,collegeCode]);
    }
    else if(desgination === "Professor"){
     
        data = await pool.query('SELECT * FROM mentor  WHERE "email"=$1 AND "collegeCode"=$2',[email,collegeCode]);
    }
    else {
       
        data = await pool.query('SELECT * FROM student  WHERE "email"=$1 AND "collegeCode"=$2',[email,collegeCode]);
    }
    if(data.rows[0]){
        let otp =Math.floor( Math.random()*100000);
        let check = await pool.query('SELECT * FROM forgot_password WHERE "id"=$1',[data.rows[0].id]);
      if(check.rows[0])  {
        await pool.query('DELETE FROM forgot_password WHERE "id"=$1',[check.rows[0].id])
      }

     data = await pool.query ('INSERT INTO forgot_password  VALUES ($1,$2) RETURNING *',[data.rows[0].id,otp])
     sendOTP(email,otp);
    }
    res.json(data.rows)
  } catch (error) {
    console.log(error)
  }

}








 module.exports = {forgetPasswordMail,sendVerificationMail}
