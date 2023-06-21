
const { S3Client, PutObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require('uuid');
const multer = require("multer");
const multerS3 = require("multer-s3");
require('dotenv').config();

const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
        secretAccessKey: process.env.SECRET_KEY,
        accessKeyId: process.env.ACCESS_KEY,
    },
});

const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.BUCKET,
       
        key: (req, file, cb) => {
            const uniqueSuffix = uuidv4();
            cb(null, uniqueSuffix + "-" + file.originalname);
        },
    }),
});

module.exports = {upload,s3Client}