import {Router} from "express";
import { getAllContactsController, getContactsByIdController } from "../controllers/contacts-controllers.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import isValidId from "../middlewares/isValidId.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getAllContactsController))


contactsRouter.get("/:contactId", isValidId, ctrlWrapper(getContactsByIdController))
        
export default contactsRouter;