const express = require("express");
const auth = require("../../middlewares/auth");
const validation = require("../../middlewares/validations");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const {
  contactsSchema,
  favoriteContactsSchema,
} = require("../../models/schemes");
const {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
} = require("../../controllers/contacts");
const router = express.Router();

router.get("/", auth, ctrlWrapper(getAllContacts));

router.get("/:contactId", ctrlWrapper(getContactById));

router.post("/", auth, validation(contactsSchema), ctrlWrapper(addContact));

router.delete("/:contactId", ctrlWrapper(removeContact));

router.put(
  "/:contactId",
  validation(contactsSchema),
  ctrlWrapper(updateContact)
);

router.patch(
  "/:contactId/favorite",
  validation(favoriteContactsSchema),
  ctrlWrapper(updateStatusContact)
);

module.exports = router;
