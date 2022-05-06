const express = require("express");

const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");

const { getCurrent, updateAvatar, verifyEmail } = require("../../controllers/users");
const router = express.Router();

router.get("/current", auth, ctrlWrapper(getCurrent));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);
router.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));

module.exports = router;
