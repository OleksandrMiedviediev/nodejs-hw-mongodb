import express, { request, response } from "express";
import cors from "cors"
import dotenv from "dotenv";
import pino from "pino-http";
import { getContacts, getContactsById } from "./services/contacts-services.js";



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

    
    app.get("/contacts", async (request, response) => {
        const result = await getContacts();

        response.json({
            status: 200,
            data: result,
            message: "Successfully found contacts!"
        });
    })
    app.get("/contacts/:id", async (request, response) => {
        try {
            
        
            const { id } = request.params;
            const data = await getContactsById(id);

            if (!data) {
                return response.status(404).json({
                    message: "Contact not found"
                })
            }
            response.json({
                status: 200,
                message: `Successfully found contact with id ${id}!`,
                data
            });
        } catch (error) {
            if (error.message.includes("Cast to ObjectId failed")) {
                error.status = 404;
            }
            const { status = 500 } = error;
            response.status(status).json({
                message: error.message
            })
        }
        })

    
    app.use((req, res) => {
        res.status(404).json({
            message: "Not Found"
        })
    })
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default setupServer;
