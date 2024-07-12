import express, { request, response } from "express";
import contacts from "../contacts.js";
import cors from "cors"
import dotenv from "dotenv";
import pino from "pino-http";


dotenv.config();
const PORT = Number(process.env.PORT);

const setupServer = () => {
    const app = express();

    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    })

    app.use(logger)
    app.use(cors());

    app.get("/api", (request, response) => {
        response.send('<h1>Home page</h1>');
    })
    app.get("/api/contacts", (request, response) => {
        response.json(contacts);
    })

    app.use((req, res) => {
        res.status(404).json({
            message: "Not Found"
        })
    })
    app.listen(`${PORT}`, () => console.log(`Server is running on port ${PORT}`));
}

export default setupServer;
