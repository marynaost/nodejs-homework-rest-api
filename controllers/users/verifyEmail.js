const { User } = require("../../models/user");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }
  await User.findByIdAndUpdate(
    user._id,
    {
      verify: true,
      verificationToken: null,
    },
    { new: true }
  );

  res.status(200).json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;