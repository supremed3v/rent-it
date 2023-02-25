import nodeMailer from "nodemailer";

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodeMailer.createTransport(
    {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    {
      secure: false,
    }
  );

  // 2) Define the email options
  const mailOptions = {
    from: `Rent It <${process.env.SMTP_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
