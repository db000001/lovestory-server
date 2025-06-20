import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: true, // SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // generated SMTP token from ProtonMail settings
  },
  logger: true,
  debug: true,
});

export const sendEmail = async ({ email, subject, html }) => {
  try {
    transporter.sendMail(
      {
        from: '"Love Story" <noreply@lovestory.ai>',
        to: email,
        subject,
        html,
      },
      (error, info) => {
        if (error) {
          console.error("Email error =>", error);
          return;
        }
        console.log("Message sent =>", info);
      }
    );
  } catch (error) {
    console.error(error.message);
  }
};
