const {  GetObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");
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
    res.send('Successfully uploaded ' + req.file.location);
}





const getReportList=async (req, res) => {
    const {fileName} = req.params;

    // const command = new GetObjectCommand({
    //     Bucket: process.env.BUCKET,
    //     Key:fileName,
    // });

    // try {
    //     const response = await s3Client.send(command);
    //     if(response){
    //         const files = response.Contents.map((item) => {
    //             const signedUrl = getSignedUrl(s3Client, new GetObjectCommand({
    //                 Bucket: process.env.BUCKET,
    //                 Key: item.Key,
    //                 expires: 3600,
    //             }));
    //             return {
    //                 Key: item.Key,
    //                 URL: signedUrl,
    //             };
    //         });
    
    //         res.send(`
    //             <html>
    //                 <head>
    //                     <title>File List</title>
    //                 </head>
    //                 <body>
    //                     <h1>File List</h1>
    //                     <ul>
    //                         ${files.map(file => `<li><a href="${file.URL}">${file.Key}</a></li>`).join('')}
    //                     </ul>
    //                 </body>
    //             </html>
    //         `);
    //     }
      
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send("Error retrieving file list");
    // }
};


// const deleteProjectReports=async(req,res)=>{
//     const {fileName} =req.params;
//     await s3Client.deleteObject({Bucket: process.env.BUCKET,key:fileName}).promise();
//     res.send("delete successfully") ;
// }

const downloadReport = async (req, res) => {
    const { filename } = req.params;
  console.log(filename)
    const params = {
      Bucket: process.env.BUCKET, // Replace with your S3 bucket name
      Key: filename,
    };
  
    try {
      // Create the GetObjectCommand
      const command = new GetObjectCommand(params);
  
      // Execute the command to retrieve the file data
      const response = await s3Client.send(command);
  
      // Set the appropriate headers for the file download
    await  res.set({
        'Content-Type': response.ContentType,
        'Content-Length': response.ContentLength,
        'Content-Disposition': `attachment; filename="${filename}"`,
      });
  
      // Stream the file data to the response
      await response.Body.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error downloading file');
    }
  };
module.exports = {uploadReport,getReportList,setReportDetails,getReportDetails,downloadReport}