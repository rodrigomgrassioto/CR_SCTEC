import express, {Express} from "express";
import routers from "./routes/index.routes";
//importação do arquivo de rotas

const app:Express = express();
app.use(express.json());
app.use(routers)

export default app;