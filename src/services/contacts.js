import Contact from "../db/models/Contacts.js";
import calcPaginationData from "../utils/calcPaginationData.js";



export const getContacts = async({filter, page, perPage, sortBy = "name", sortOrder = "asc"}) => {
  const skip = (page - 1) * perPage;
  const databaseQuery = Contact.find();
  if (filter.userId) {
    databaseQuery.where("userId").equals(filter.userId);
  }
  if (filter.contactType) {
    databaseQuery.where("contactType").equals(filter.contactType);
  }
  if (filter.isFavourite) {
    databaseQuery.where("isFavourite").equals(filter.isFavourite);
  }

  const data = await databaseQuery.find().skip(skip).limit(perPage).sort({[sortBy]: sortOrder});
  const totalItems = await Contact.find().merge(databaseQuery).countDocuments();
  const {totalPages, hasNextPage, hasPreviousPage} = calcPaginationData({total: totalItems, perPage, page})
  return {
    data,
    page,
    perPage,
    totalPages,
    totalItems,
    hasPreviousPage,
    hasNextPage,
  }
};


export const getContactsFilter = filter => Contact.findOne(filter);

export const addContact = data => Contact.create(data);

export const updateContact = async (contactId, payload, options = {}) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!result || !result.value) return null;

  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (studentId) => {
    
}