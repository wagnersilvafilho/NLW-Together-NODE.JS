import "reflect-metadata";
import express, { NextFunction, Request, response, Response } from "express";
import "express-async-errors"

import { router } from "./routes";

import "./database";

const app = express();

app.use(express.json());

app.use(router);

//middleware de erro possui 4 parametros
//biblioteca do express não tem suporte async
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error){
        return response.status(400).json({
            error: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});

app.listen(3000, () => console.log("Server is running NLW"));