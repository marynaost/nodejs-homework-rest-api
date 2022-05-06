const uuid = require("uuid");
const { User } = require("../../models/user");
const { sendEmail } = require("../../helpers");

const reVerifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({
      message: "missing required field email",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({
      message: `User with email ${email} is not found`,
    });
  }

  if (user.verified) {
    res.status(400).json({
      message: "Verification has already been passed",
    });
  }

  const verificationToken = uuid.v4();

  await User.findByIdAndUpdate(user._id, { verificationToken }, { new: true });

  const mail = {
    to: email,
    from: "marynaum01@meta.com",
    subject: "Email reverify",
    text: "Please verify your email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Please verify your email</a>`,
  };

  await sendEmail(mail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = reVerifyEmail;
