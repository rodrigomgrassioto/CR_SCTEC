import "reflect-metadata"
import {DataSource} from "typeorm";


// modelo na pág do TypeORM
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST ?? "error",
    port:  Number(process.env.PG_PORT) ??  5432,
    username: process.env.PG_USER ?? "postgres",
    password: process.env.PG_PASSWORD ?? "",
    database: process.env.PG_DATABASE ?? "error",
    synchronize: true,
    logging: true,
    logger: "advanced-console",
    // entities: [Post, Category], // passando por nome
    entities: ['src/entities/*.ts'], // passando todos os arquivos do caminho
    subscribers: [],
    migrations: [],
})