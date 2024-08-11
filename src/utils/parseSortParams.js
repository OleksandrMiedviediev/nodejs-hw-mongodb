import { sortOrderList } from "../db/constants/index.js";

const parseSortParams = ({ sortBy, sortOrder }, fieldList) => {
    const parssedSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : sortOrderList[0];
    const parsedSortBy = fieldList.includes(sortBy) ? sortBy : fieldList[0];
    

    return {
        sortBy: parsedSortBy,
        sortOrder: parssedSortOrder,
    }
}

export default parseSortParams;