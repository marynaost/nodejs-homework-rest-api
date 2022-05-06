const express = require("express");

const auth = require("../../middlewares/auth");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const { getCurrent, verifyEmail } = require("../../controllers/users");
const router = express.Router();

router.get("/current", auth, ctrlWrapper(getCurrent));
router.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));

module.exports = router;
