import fs from "node:fs/promises"
import path from "node:path";
import { PUBLIC_UPLOAD_DIR } from "../db/constants/index.js";
import env from "./env.js";


const saveFileToPublicDir = async (file, filePath) => {
    const newPath = path.join(PUBLIC_UPLOAD_DIR, filePath, file.filename);
    await fs.rename(file.path, newPath);

    return `/${filePath}/${file.filename}`;
}

export default saveFileToPublicDir;