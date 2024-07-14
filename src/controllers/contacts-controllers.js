import createHttpError from "http-errors";
import { getContacts, getContactsById, addContact, updateContact} from "../services/contacts.js";
import createError from "http-errors";
import Contact from "../db/models/Contacts.js";

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

export const addContactController = async (req, res) => {
    const data = await addContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    })
}



export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;

 const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = 200;

  res.status(status).json({
    status,
    message: "Successfully patched a contact!",
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    
    const contact = await Contact.findByIdAndDelete({
        _id: contactId,
    });

      if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
}