

import nodemailer from 'nodemailer';
import { emailTemplate } from './emailTemplate.js';


export async function sendEmail(options) {

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIl_PASSWORD,
  },
});

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `Fred Foo 👻" <${process.env.GMAIL_EMAI}>`, // sender address
    to: options.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: emailTemplate(options.api), // html body
  });

  console.log("Message sent: %s", info.messageId);









}