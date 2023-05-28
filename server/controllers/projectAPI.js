const express = require('express')
const pool = require('../config/db')

const addNewProject =async(req,res)=>{
    const {type} = req.params;
    if(type === 'project'){
    const {id,projectName,leaderId,description,mentorid,date,status} = req.body;
    await pool.query('INSERT INTO project_detials VALUES($1,$2,$3,$4,$5,$6,$7)',[
        id,projectName ,description ,date,status,mentorid,leaderId
    ])
 
}
else{
    const {projectId,memberId} = req.body;
    await pool.query('INSERT INTO project_members VALUES ($1,$2)',[
        memberId,projectId
    ])
}

}


module.exports = addNewProject