const {ListObjectsV2Command } = require("@aws-sdk/client-s3");
const {s3Client} = require('../config/s3')
require('dotenv').config();
const uploadReport= async (req,res)=>{

    res.send('Successfully uploaded ' + req.file.location);
}

const getReportList=async(req,res)=>{
   
        const command = new ListObjectsV2Command({
            Bucket: process.env.BUCKET,
        });
        try {
            const response = await s3Client.send(command);
            const fileNames = response.Contents.map((item) => item.Key);
            res.send(fileNames);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error retrieving file list");
        }
}
const deleteProjectReports=async(req,res)=>{
    const {fileName} =req.params;
    await s3Client.deleteObject({Bucket: process.env.BUCKET,key:fileName}).promise();
    res.send("delete successfully") ;
}
module.exports = {uploadReport,getReportList,deleteProjectReports}