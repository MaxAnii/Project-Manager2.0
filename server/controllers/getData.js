const express = require("express");
const pool = require("../config/db");

const getDashBoardInformation =async(req,res)=>{
    const {type,collegeCode,dname} = req.params;
    if(type === 'College Admin'){
        const data = await pool.query('SELECT * FROM department WHERE "collegeCode"=$1 ORDER BY (dname) ASC ',[collegeCode]);
        res.json(data.rows);
    }
    else{
        const data = await pool.query('SELECT * FROM mentor WHERE "collegeCode"=$1 AND "dname"=$2 ORDER BY (name) ASC ',[collegeCode,dname]);
        res.json(data.rows);
    }
    }


    const getMentorList=async(req,res)=>{
        const {type,collegeCode,dname} = req.params;
        if(type === 'interCollege'){
          
            
            const data = await pool.query('SELECT * FROM mentor WHERE "collegeCode"=$1 ORDER BY (name) ASC ',[collegeCode]);
            res.json(data.rows);
        }
        else{
           
            const data = await pool.query('SELECT * FROM mentor WHERE "collegeCode"=$1 AND "dname"=$2 ORDER BY (name) ASC ',[collegeCode,dname]);
            res.json(data.rows);
        }
    }
    

    const getProjectMemberList=async(req,res)=>{
        const {type,collegeCode,dname} = req.params;
        if(type === 'interCollege'){
           
            const data = await pool.query('SELECT * FROM student WHERE "collegeCode"=$1 ORDER BY (name) ASC ',[collegeCode]);
            res.json(data.rows);
        }
        else{
          
            const data = await pool.query('SELECT * FROM student WHERE "collegeCode"=$1 AND "dname"=$2 ORDER BY (name) ASC ',[collegeCode,dname]);
            res.json(data.rows);
           
        }
    }

    const getPersonalInformation=async(req,res)=>{
        const{type,id}=req.params;
        let data;
        if(type == 'admin'){
            data = await pool.query('SELECT * FROM admin WHERE "id"=$1',[id])          
        }
        else if(type === 'department'){
            data = await pool.query('SELECT  department."collegeCode","dname","name",department."email", department."password","hodid",department."id","collegeName" FROM department, admin WHERE department."id"=$1 AND department."collegeCode" = admin."collegeCode"',[id])
        }
        else if(type === 'mentor'){
            data = await pool.query('SELECT  mentor."collegeCode","dname","name",mentor."email", mentor."password","profId",mentor."id", "collegeName" FROM mentor, admin WHERE mentor."id"=$1 AND mentor."collegeCode" = admin."collegeCode"',[id])
        }
        else{
            data = await pool.query('SELECT  student."collegeCode","dname","name",student."email", student."password","studentId","year",student."id", "collegeName" FROM student, admin WHERE student."id"=$1 AND student."collegeCode" = admin."collegeCode"',[id])
        }

        res.json(data.rows[0]);
    }


    module.exports = {getDashBoardInformation,getMentorList,getProjectMemberList,getPersonalInformation};