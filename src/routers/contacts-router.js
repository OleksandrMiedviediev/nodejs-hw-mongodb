import { Router } from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import upload from '../middlewares/upload.js'

import { getAllContactsController, getContactsByIdController, addContactController, patchContactController, deleteContactController } from "../controllers/contacts-controllers.js";

import isValidId from "../middlewares/isValidId.js";

import { contactAddSchema, contactUpdateSchema } from "../validation/contact-schemas.js";
import aunthenticate from "../middlewares/authenticate.js";

const contactsRouter = Router();
contactsRouter.use(aunthenticate);

contactsRouter.get("/", ctrlWrapper(getAllContactsController));


contactsRouter.get("/:contactId", isValidId, ctrlWrapper(getContactsByIdController))

contactsRouter.post("/", upload.single("photo"),validateBody(contactAddSchema), ctrlWrapper(addContactController))
contactsRouter.patch("/:contactId", validateBody(contactUpdateSchema), ctrlWrapper(patchContactController));
contactsRouter.delete("/:contactId", ctrlWrapper(deleteContactController))
        
export default contactsRouter;