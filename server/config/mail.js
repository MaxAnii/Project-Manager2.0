const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{      
        user:process.env.email,
        pass:process.env.pass 
    },
});

module.exports = transport