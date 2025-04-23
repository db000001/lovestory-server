import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, html }) => {
  try {
    console.log("Email => ", email);
    // console.log("Email host => ", process.env.EMAIL_HOST);
    // console.log("Email user => ", process.env.EMAIL_USER);
    // console.log("Email password => ", process.env.EMAIL_PASSWORD);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // Use true for port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Use your actual password or app password
      },
      connectionTimeout: 50000, // 10 seconds timeout
      greetingTimeout: 50000, // 10 seconds timeout
      socketTimeout: 50000,
    });

    transporter.sendMail(
      {
        from: '"Love Story" <noreply@lovestory.ai>',
        to: email,
        subject,
        html,
      },
      (error, info) => {
        if (error) {
          return console.log(error.message);
        }
        console.log(`Message sent: ${info.messageId}`);
      }
    );
  } catch (error) {
    console.error(error.message);
  }
};
