import nodemailer from 'nodemailer';
import 'dotenv/config';
//createTransport - функція яка виконує зʼєднання з SMTP servisom
//transporter - обʼєкт з методами налаштований на зʼєднання з brevo
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// async щоб вона проміс повертала і ми зможемо її await
export const sendEmail = async (options) => {
  return transporter.sendMail(options);
};
// "email": "zycyckcwtspxftmblu@gonrr.net",
   // "password": "123123qwe"
