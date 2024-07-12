import Contact from "../db/models/Contacts.js";



export const getContacts = () => Contact.find();

export const getContactsById = contactId => Contact.findById(contactId);