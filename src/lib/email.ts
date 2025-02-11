import nodemailer from "nodemailer";

type Question = {
  title: string;
  description: string;
  inputLabel: string;
  placeholder: string;
};

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: import.meta.env.VITE_ZOHO_EMAIL,
    pass: import.meta.env.VITE_ZOHO_PASSWORD,
  },
});

export const sendPreferenceEmail = async (
  answers: string[],
  questions: Question[],
) => {
  const emailContent = answers
    .map((answer, index) => {
      return `${questions[index].title}: ${answer}`;
    })
    .join("\n");

  const mailOptions = {
    from: import.meta.env.VITE_ZOHO_EMAIL,
    to: import.meta.env.VITE_RECIPIENT_EMAIL,
    subject: "New Gift Preference Submission",
    text: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
};
