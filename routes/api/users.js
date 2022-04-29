const express = require("express");

const auth = require("../../middlewares/auth");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const { getCurrent } = require("../../controllers/users");
const router = express.Router();

router.get("/current", auth, ctrlWrapper(getCurrent));

module.exports = router;
