const express = require("express");
const validation = require("../../middlewares/validations");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const contactsSchema = require("./schemes");
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../controllers/contacts");
const router = express.Router();

router.get("/", ctrlWrapper(listContacts));

router.get("/:contactId", ctrlWrapper(getContactById));

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.put(
  "/:contactId",
  validation(contactsSchema),
  ctrlWrapper(updateContact)
);

module.exports = router;
