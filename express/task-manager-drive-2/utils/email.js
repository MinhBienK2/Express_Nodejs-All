const nodemailer = require('nodemailer');
const pug =require('pug')
const htmlToText = require("html-to-text");

module.exports = class Email{
    constructor(user,url){
        this.to = user.email
        this.firstName = user.name.split(' ')[0]
        this.url = url
        this.from = `Job Manager <${process.env.EMAIL_FROM}>`
    }

    newTransport(){
        if(process.env.NODE_ENV === 'production'){
            //Sendgrid
            return 1
        }
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
        })
    }

    //Send the actual email
    async send(template,subject){
        //1. Render HTML based on a pug template
        const html = await pug.renderFile(`${__dirname}/../views/pug/email/${template}.pug`,{
            firstName: this.firstName,
            url: this.url,
            subject,
            email: this.to
            
        })
        //2. Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        }
        //3. Create a transport and send email
        await this.newTransport().sendMail(mailOptions)
    }

    async sendWelcome(){
        await this.send('welcome','Welcome to the Job Manager')
    }
}

  