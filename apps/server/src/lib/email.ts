// email.ts
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Gmail: smtp.gmail.com
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  await transporter.sendMail({
    from: '"Your App" <no-reply@yourdomain.com>',
    to,
    subject,
    text,
  });
}
