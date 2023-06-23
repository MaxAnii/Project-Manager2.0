const {  GetObjectCommand, ListObjectsV2Command,DeleteObjectCommand } = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {s3Client} = require('../config/s3')
const pool = require('../config/db');
require('dotenv').config();



const setReportDetails = async(req,res)=>{
  
const {projectId,reportId,name} = req.body;
 await pool.query('INSERT INTO project_report VALUES ($1,$2,$3) RETURNING *',[projectId,reportId,name]);
res.status(200).send("success");
}


const getReportDetails = async(req,res)=>{
const {projectId} = req.params;
const data = await pool.query('SELECT * FROM project_report WHERE "projectId"=$1',[projectId]);

res.json(data.rows);
}

const uploadReport= async (req,res)=>{
    res.status(200).send('Successfully uploaded');
}





const getReportList = async (req, res) => {
  const { fileName } = req.params;

  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET,
    Key: fileName,
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
 
  
    res.send(signedUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating signed URL");
  }
  
};




const deleteReport = async (req, res) => {
  const { reportId } = req.params;
  const key =`${reportId}.pdf`
  const command = new DeleteObjectCommand({
    Bucket: process.env.BUCKET,
    Key: key,
  });

  try {
    await s3Client.send(command);
    await pool.query ('DELETE FROM project_report WHERE "reportId"=$1',[reportId])
    res.send("File deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting file");
  }
};

const downloadReport = async (req, res) => {
    // const { filename } = req.params;
  
    // const params = {
    //   Bucket: process.env.BUCKET, // Replace with your S3 bucket name
    //   Key: filename,
    // };
  
    // try {
    //   // Create the GetObjectCommand
    //   const command = new GetObjectCommand(params);
  
    //   // Execute the command to retrieve the file data
    //   const response = await s3Client.send(command);
  
    //   // Set the appropriate headers for the file download
    // await  res.set({
    //     'Content-Type': response.ContentType,
    //     'Content-Length': response.ContentLength,
    //     'Content-Disposition': `attachment; filename="${filename}"`,
    //   });
  
    //   // Stream the file data to the response
    //   await response.Body.pipe(res);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).send('Error downloading file');
    // }
  };
module.exports = {uploadReport,getReportList,setReportDetails,getReportDetails,downloadReport,deleteReport}