const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({
      message: `Email ${email} not found`,
    });
    return;
  }
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || user.verify || !passCompare) {
    res.status(401).json({
      message: "Email or password is wrong",
    });
    return;
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
