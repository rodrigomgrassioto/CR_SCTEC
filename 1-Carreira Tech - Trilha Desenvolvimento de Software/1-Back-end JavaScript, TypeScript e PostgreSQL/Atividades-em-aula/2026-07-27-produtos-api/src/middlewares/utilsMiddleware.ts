import {Runtime} from "node:inspector";
import Timestamp = module
import module = require("node:module");
import {Request, Response, NextFunction} from "express";

export function loggerMiddleware(req: Request, res: Response, next: NextFunction): void{
    const start = Date.now();
    const ts = new Date().toString().slice(0,19).replace('T', ' ');

    res.on('finish', ()=>{
        const ms = Date.now() - start;
        console.log(`[${ts}] ${req.method} ${req.originalUrl} (${ms})`);
    })
    next();
 }

 export function requireJson(req: Request, res: Response, next: NextFunction){
    const mutating = ['POST','PUT', 'PATCH'].includes(req.method);
    const isJson = req.is('application/json') ?? false;

    if (mutating && !isJson){
        res.status(415).json({error: 'Content-Type deve ser application/json'})
        return
    }
    next();
 }

 export function timeOut(req: Request, res:Response, next: NextFunction) {
    // Tempo limite (ex: 10000 milissegundos = 10 segundos)
    req.setTimeout(10000, () => {
        if (!res.headersSent) {
            res.status(504).json({
                erro: 'Timeout',
                mensagem: 'O servidor demorou muito para responder.'
            });
        }
    });
    next();
}
