const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "marynaum01@meta.ua" };

  try {
    await sgMail.send(email);
    console.log(`Email successfully sent to ${data.to}`);
    return true;
  } catch (error) {
    console.log(`Email not sent to ${data.to}: `, error.message);
    throw error;
  }
};

module.exports = sendEmail;
