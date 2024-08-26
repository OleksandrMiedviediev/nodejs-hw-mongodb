import initMongoConnection from "./db/initMongoConnection.js";
import setupServer from "./server.js";

import createDirIfNotExists from "./utils/createDirNotExists.js";
import { PUBLIC_PHOTOS_DIR, PUBLIC_UPLOAD_DIR, TEMP_UPLOAD_DIR } from "./db/constants/index.js";

const bootstrap = async () => {
    await initMongoConnection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(PUBLIC_UPLOAD_DIR);
    await createDirIfNotExists(PUBLIC_PHOTOS_DIR);
    setupServer();
}

bootstrap();