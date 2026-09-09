import {Request, Response, NextFunction} from "express";
import {AppError} from "../errors/AppError";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err)

    if (err instanceof AppError) {
        res.status(400).json({message: err.message})
    }

    return res.status(500).json({
        message: "Erro no servidor."
    })
}
