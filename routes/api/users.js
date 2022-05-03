const express = require("express");

const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const { getCurrent, updateAvatar } = require("../../controllers/users");
const router = express.Router();

router.get("/current", auth, ctrlWrapper(getCurrent));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

module.exports = router;
