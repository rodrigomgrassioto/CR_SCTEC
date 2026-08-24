import "reflect-metadata"
import express from "express";
import {AppDataSource} from "./database/data-source";

const app = express();
app.use(express.json())

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source inicializado.');
        app.listen(process.env.SYSTEM_PORT, () => {
            console.log(`Server rodando na porta: ${process.env.SYSTEM_PORT}`);
        })
    }).catch((err) => {
        console.error("Erro ao inicializar o data source: \n"+ err);
})
