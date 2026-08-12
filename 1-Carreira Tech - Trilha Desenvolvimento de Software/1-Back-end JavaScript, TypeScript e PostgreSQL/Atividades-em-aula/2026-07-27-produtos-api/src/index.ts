import express, {Express, Request, Response} from "express";

const app: Express = express();
const PORT = process.env.SYSTEM_PORT || 3001;

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rota de health-check
app.get("/health-check", (req: Request, res: Response) => {
    res.json ({
        status: "OK",
        timestamp: new Date().toString(),
    });
})

// inicar server

app.listen(PORT, () =>{
    console.log("Servidor rodando em localhost, porta: " + PORT);
})

export default app;