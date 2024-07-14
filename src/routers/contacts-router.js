import {Router} from "express";
import { getAllContactsController, getContactsByIdController, addContactController, patchContactController, deleteContactController } from "../controllers/contacts-controllers.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import isValidId from "../middlewares/isValidId.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getAllContactsController))


contactsRouter.get("/:contactId", isValidId, ctrlWrapper(getContactsByIdController))

contactsRouter.post("/", ctrlWrapper(addContactController))
contactsRouter.patch("/:contactId", ctrlWrapper(patchContactController));
contactsRouter.delete("/:contactId", ctrlWrapper(deleteContactController))
        
export default contactsRouter;