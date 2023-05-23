const express = require("express");
const pool = require("../config/db");

const getDashBoardInformation =async(req,res)=>{
    const {type,collegeCode} = req.params;
    if(type === 'College Admin'){
        const data = await pool.query('SELECT * FROM department WHERE "collegeCode"=$1 ORDER BY (dname) ASC ',[collegeCode]);
        res.json(data.rows);
    }
    }
    
    module.exports = getDashBoardInformation;