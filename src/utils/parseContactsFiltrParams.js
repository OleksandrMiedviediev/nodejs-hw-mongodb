import { contactList } from "../db/constants/index.js";


const parseBoolean = value => {
    if (typeof value !== "string") return;
    if (!["true", "false"].includes(value)) return;

    return value === "true"
}

const parseContactsFilterParams = ({ contactType, isFavourite }) => {
    const parsedContactType = contactList.includes(contactType) ? contactType : null;
    const parsedIsFavourite = parseBoolean(isFavourite);
    return {
        contactType: parsedContactType,
        isFavourite: parsedIsFavourite,
    }
}

export default parseContactsFilterParams;