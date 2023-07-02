const express = require("express");
const pool = require("../config/db");
const addNewProject = async (req, res) => {
  const { type } = req.params;

  if (type === "project") {
    const { id, projectName, leaderId, description, mentorid, date, status } =
      req.body;
    await pool.query(
      "INSERT INTO project_detials VALUES($1,$2,$3,$4,$5,$6,$7)",
      [id, projectName, description, date, status, mentorid, leaderId]
    );
  } else {
    const { projectId, memberId } = req.body;
    await pool.query("INSERT INTO project_members VALUES ($1,$2)", [
      memberId,
      projectId,
    ]);
  }
};

const getProjectList = async (req, res) => {
  const { type, id, dname } = req.params;
  let data;
  try {
    if (type === "student") {
      data = await pool.query(
        '(SELECT project_detials."id", "projectName" ,"description" ,"StartDate","finalizeDate","rejectReason", "status",mentor."name", "leaderId" FROM project_detials,mentor WHERE  mentor."id" = "mentorId" AND project_detials."id" IN (SELECT "projectId" FROM project_members WHERE "memberId"=$1) UNION SELECT project_detials."id", "projectName" ,"description" ,"StartDate","finalizeDate","rejectReason", "status",mentor."name", "leaderId" FROM project_detials,mentor WHERE  mentor."id" = "mentorId" AND "leaderId" = $2) ORDER BY "StartDate" DESC ',
        [id, id]
      );
    } else if (type === "mentor") {
      data = await pool.query(
        '(SELECT project_detials."id", mentor."name", "projectName" ,"description" ,"StartDate","finalizeDate", "status" ,"rejectReason" FROM project_detials,mentor WHERE project_detials."mentorId"=$1 AND project_detials."mentorId"=mentor."id") ORDER BY "StartDate" DESC ',
        [id]
      );
    } else if (type === "admin") {
      data = await pool.query(
        'SELECT project_detials."id", mentor."dname","projectName" ,"description" ,"StartDate","finalizeDate","rejectReason", "status",mentor."name", "leaderId" FROM project_detials,mentor WHERE  mentor."id" = "mentorId" AND "mentorId" IN (SELECT "id" FROM mentor WHERE "collegeCode"=$1)',
        [id]
      );
    } else {
      data = await pool.query(
        'SELECT project_detials."id", "projectName" ,"description" ,"StartDate","finalizeDate","rejectReason", "status",mentor."name", "leaderId" FROM project_detials,mentor WHERE  mentor."id" = "mentorId" AND "mentorId" IN (SELECT "id" FROM mentor WHERE "collegeCode"=$1 AND "dname"=$2)',
        [id, dname]
      );
    }

    res.json(data.rows);
  } catch (error) {
    console.log(error);
  }
};

const getMembertList = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await pool.query(
      'SELECT "studentId",student."id" FROM student, project_members WHERE student."id" ="memberId" AND  project_members."projectId"=$1 UNION SELECT "studentId", student."id" FROM student, project_detials WHERE student."id" ="leaderId" AND project_detials."id"=$1 ',
      [id]
    );
    res.json(data.rows);
  } catch (error) {
    console.log(error);
  }
};

const updateProjectStatus = async (req, res) => {
  const { type } = req.params;

  try {
    if (type === "finalize") {
      const { date, id, status } = req.body;
      await pool.query(
        'UPDATE project_detials SET "finalizeDate"=$1 ,"status"=$2 WHERE "id"=$3',
        [date, status, id]
      );
    } else {
      const { status, id, reason } = req.body;
      await pool.query(
        'UPDATE project_detials SET "status"=$1,"rejectReason"=$2 WHERE "id"=$3',
        [status, reason, id]
      );
    }
    res.send("updated");
  } catch (error) {
    console.log(error);
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM project_detials WHERE "id"=$1', [id]);

    res.send("deleted");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addNewProject,
  getProjectList,
  getMembertList,
  updateProjectStatus,
  deleteProject,
};
