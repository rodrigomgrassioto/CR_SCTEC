import { Request, Response, NextFunction } from 'express';
 import {AppError} from "../types/appError";

 export function errorHandle(
     err: unknown,
     req: Request,
     res: Response,
     _next: NextFunction // o _ indica q é obrigatório mas não é usado no corpo da função
 ): void {
     if (err instanceof AppError) {
         res.status(err.statusCode).json({error: err.message});
         return
     }

     console.error('[ERRO INESPERRADO]', err)
     res.status(500).json({error: 'Erro interno no servidor'})
 }