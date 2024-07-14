import { getContacts, getContactsById } from "../services/contacts.js";
import createError from "http-errors";

export const getAllContactsController = async (req, res, next) => {

    const data = await getContacts();

    res.json({
        status: 200,
        data,
        message: "Succes found contact"
    })
}

export const getContactsByIdController = async (req, res, next) => {

    const { contactId } = req.params;
    
    const data = await getContactsById(contactId);
    if (!data) {
        throw createError(404, "Contact not found");
    }
    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data
    });
}