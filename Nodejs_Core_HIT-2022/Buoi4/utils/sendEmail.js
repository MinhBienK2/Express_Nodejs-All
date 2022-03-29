const nodemailer = require("nodemailer");



const sendEmail = (options) => {
    const transporter  = nodemailer.createTransport({
        host: process.env.HOST_MAIL,
        port: process.env.PORT_MAIL,
        auth: {
          user: process.env.USERNAME_MAIL,
          pass: process.env.PASSWORD_MAIL
        }
    });

    const mailOptions = {
        from: `"Fred Foo 👻" <hellobannho@gmail.com>`, // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.message, // plain text body
        // html: "<b>Hello world?</b>", // html body
    }

    transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
