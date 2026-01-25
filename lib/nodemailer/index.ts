import nodemailer, { SentMessageInfo } from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "./tempaltes";
export const transporter = nodemailer.createTransport({
 host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'bernhard.skiles28@ethereal.email',
        pass: 'N2QsHRJBFKgvHkXg1H'
    }
});

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: SentMessageInfo) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name).replace(
    "{{intro}}",
    intro
  );

  const mailOptions = {
    from: "Stock Trading Platform <" + process.env.EMAIL_USER + ">",
    to: email,
    subject: "Welcome to Stock Trading Platform!",
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};
