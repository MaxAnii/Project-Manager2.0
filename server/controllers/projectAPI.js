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


const getProjectList=async(req,res)=>{
const {type,id} = req.params;
let data;
if(type === 'student'){
     data = await pool.query('SELECT project_detials."id", "projectName" ,"description" ,"date", "status",mentor."name", "leaderId" FROM project_detials,mentor WHERE  mentor."id" = "mentorId" AND project_detials."id" IN (SELECT "projectId" FROM project_members WHERE "memberId"=$1) UNION SELECT project_detials."id", "projectName" ,"description" ,"date", "status",mentor."name", "leaderId" FROM project_detials,mentor WHERE  mentor."id" = "mentorId" AND "leaderId" = $2 ',[id,id])
}
else if(type === 'mentor'){
    data = await pool.query('SELECT project_detials."id", "projectName" ,"description" ,"date", "status","studentId"  FROM project_detials,student WHERE "mentorId"=$1 AND "leaderId"=student."id"',[id])
}

res.json(data.rows)
}
const getMembertList=async(req,res)=>{
const {type,id} = req.params;

 let data;
if(type === 'student'){
     data = await pool.query(' SELECT "projectId","studentId" FROM project_members,student WHERE "id"="memberId" AND "projectId" IN (SELECT "projectId" FROM project_members WHERE "memberId"=$1) UNION SELECT "projectId", "studentId" FROM project_members,student WHERE "projectId" IN (SELECT "id" FROM project_detials WHERE "leaderId" =$1)',[id])
}
else if(type === 'mentor'){
    data = await pool.query('SELECT "projectId","studentId" FROM project_members,student  WHERE "id"="memberId" AND "projectId" IN (SELECT "id" FROM project_detials WHERE "mentorId"=$1)',[id])
}

 res.json(data.rows)
}



module.exports = {addNewProject,getProjectList,getMembertList}