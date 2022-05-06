const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const uuid = require("uuid");
const { User } = require("../../models/user");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({
      message: `User with ${email} already exist`,
    });
    return;
  }
  const verificationToken = uuid.v4();
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Verify your email</a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = signup;
