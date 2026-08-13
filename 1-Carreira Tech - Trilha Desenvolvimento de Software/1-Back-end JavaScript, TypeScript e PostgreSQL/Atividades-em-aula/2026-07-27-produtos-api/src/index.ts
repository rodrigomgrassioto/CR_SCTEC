import express, {Express, Request, Response} from "express";
import router from "./routes/produtoRotes";
import {ProdutoRepository} from "./repositories/ProdutoRepository";
import {CreateProdutoDto} from "./types/produto.types";
import {pool} from './config/database'
import {errorHandle} from "./middlewares/errorHandle";


const app: Express = express();
const PORT = process.env.SYSTEM_PORT || 3002;

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rotas
app.use('/api/v1/produtos', router);

// rota de health-check
app.get("/health-check", (req: Request, res: Response) => {
    res.json ({
        status: "OK",
        timestamp: new Date().toString(),
    });
})

// rota desconhecida - 404
app.use((_: unknown, res: Response) => res.status(404).json({error: 'Rota não encontrada'}))


// middleware de tratamento de erros (deve ser o último middleware)
app.use(errorHandle)

// test
// const item: CreateProdutoDto ={
//     nome: 'Teclado Mecânico',
//     preco: 299.90,
//     estoque: 15
// }
// const prodRep = new ProdutoRepository(pool)
// prodRep.create(item);

// iniciar server
app.listen(PORT, () =>{
    console.log("Servidor rodando em localhost, porta: " + PORT);
})

export default app;