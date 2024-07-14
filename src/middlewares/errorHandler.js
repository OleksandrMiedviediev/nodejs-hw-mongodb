import { HttpError } from "http-errors";

const errorHandler = (error, req, res, next) => {
    if (err instanceof HttpError) {
        const { status, message } = error;
        res.status(err.status).json({
            status,
            message,
            data: err,
        });
        return;
    }

    res.status(500).json({
        status: 500,
        message: "Something went wrong",
        data: error.message,
    })
}

export default errorHandler; 