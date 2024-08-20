import createHttpError from "http-errors";
import { getContacts, addContact, updateContact, getContactsFilter} from "../services/contacts.js";
import createError from "http-errors";
import Contact from "../db/models/Contacts.js";
import parsePaginationParams from "../utils/parsePaginationParams.js";
import parseSortParams from "../utils/parseSortParams.js";
import { contactsFieldList } from "../db/constants/contacts-constants.js";
import parseContactsFilterParams from "../utils/parseContactsFiltrParams.js";

export const getAllContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, contactsFieldList);
  const filter = {...parseContactsFilterParams(req.query), userId};

  const data = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

    res.json({
        status: 200,
        data,
        message: "Succes found contact"
    })
}

export const getContactsByIdController = async (req, res, next) => {
  const { _id: userId } = req.user;
    const { contactId} = req.params;
    
    const data = await getContactsFilter({_id: contactId, userId});
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
  const { _id: userId } = req.user;
    const data = await addContact({...req.body, userId});

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    })
}



export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const result = await updateContact({_id: contactId, userId}, req.body);

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
  const { _id: userId } = req.user;
    
  const contact = await Contact.findOneAndDelete({ _id: contactId, userId });

      if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
}