import express, { request, response } from "express";
import cors from "cors"
import dotenv from "dotenv";
import pino from "pino-http";
import contactsRouter from "./routers/contacts-router.js";
import notFaundHandler from "./middlewares/notFaundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";



dotenv.config();
const { PORT } = process.env;

const setupServer = () => {
    const app = express();

    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    })

    app.use(logger)
    app.use(cors());
    app.use(express.json())

    app.use("/contacts", contactsRouter);
    
    app.use(notFaundHandler);
    app.use(errorHandler)
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default setupServer;
