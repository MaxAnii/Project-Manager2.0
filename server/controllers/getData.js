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

    


    module.exports = {getDashBoardInformation,getMentorList,getProjectMemberList};