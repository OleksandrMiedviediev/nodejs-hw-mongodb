import { Router } from "express";
import validateBody from "../utils/validateBody.js";
import { getAllContactsController, getContactsByIdController, addContactController, patchContactController, deleteContactController } from "../controllers/contacts-controllers.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import isValidId from "../middlewares/isValidId.js";
import { contactAddSchema, contactUpdateSchema } from "../validation/contact-schemas.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getAllContactsController))


contactsRouter.get("/:contactId", isValidId, ctrlWrapper(getContactsByIdController))

contactsRouter.post("/", validateBody(contactAddSchema), ctrlWrapper(addContactController))
contactsRouter.patch("/:contactId", validateBody(contactUpdateSchema), ctrlWrapper(patchContactController));
contactsRouter.delete("/:contactId", ctrlWrapper(deleteContactController))
        
export default contactsRouter;