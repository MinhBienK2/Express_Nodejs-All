const nodemailer = require("nodemailer");

const sendEmail =async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });
  
    // send mail with defined transport object
    const mailOptions = {
        from: `"Fred Foo 👻" <hellobannho@gmail.com>`, // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.message, //plain text body
        //   html: "<b>Hello world?</b>", // html body
    }
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
  