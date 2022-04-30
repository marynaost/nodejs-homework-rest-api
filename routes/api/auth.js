const express = require("express");
const validation = require("../../middlewares/validations");
const auth = require("../../middlewares/auth");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const { signup, login, logout } = require("../../controllers/auth");
const { joiSignupSchema, joiLoginSchema } = require("../../models/user");
const router = express.Router();

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(signup));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(login));
router.post("/logout", auth, ctrlWrapper(logout));

module.exports = router;
