import {Router, Request, Response, NextFunction} from "express";
import {ProdutoRepository} from "../repositories/ProdutoRepository";
import {pool} from "../config/database";
import {ProdutoService} from "../services/produtoService";
import {IdParam, ProdutoController} from "../controllers/produtoController";
import {UpdateProdutoDto} from "../types/produto.types";

const repo = new ProdutoRepository(pool);
const service = new ProdutoService(repo)
const ctrl = new ProdutoController(service);

const router = Router();

// lista em memória. (hardcoded)
// const produtosEmMemoria: Produto[] = [
//     {
//         id: 1,
//         nome: 'Notebook Pro 17',
//         preco: 4999.99,
//         estoque: 10,
//         ativo: true,
//         criadoEm: new Date('2023-01-15T00:00:00.000Z'),
//     },
//     {
//         id: 2,
//         nome: 'Mouse games',
//         preco: 249.99,
//         estoque: 30,
//         ativo: true,
//         criadoEm: new Date('2023-01-19T00:00:00.000Z'),
//     },
//     {
//         id: 3,
//         nome: 'Teclado mecânico',
//         preco: 399.98,
//         estoque: 15,
//         ativo: true,
//         criadoEm: new Date('2023-01-11T00:00:00.000Z'),
//     },
// ];
// GET api/vi/produtos
/*
Request<Params, ResBody, ReqBody, ReqQuery>
1 {} = (Params): São os parâmetros de URL (como o :id). Como essa rota é apenas /, não tem parâmetros. Por isso está vazio {}
2 Produtos[] = Essa segunda posição define o tipo do corpo da Resposta
3 {} (ReqBody): Esse sim é o corpo da requisição (o que você envia). Como é um GET e não enviamos nada, ele deixou vazio
4 {} (ReqQuery): São os parâmetros de busca que vão na URL depois da interrogação (ex: ?busca=cadeira).
// */
// router.get('/', (req: Request<{}, Produto[], {}, {}>, res: Response<Produto[]>) => {
//     res.json(produtosEmMemoria);
// })

// GET api/vi/produtos/:id - busca por ID
// router.get('/:id', (req: Request<{ id: string }>, res: Response<Produto | {error: string}>) => {
//     const id = Number(req.params.id);
//     if(isNaN(id)) return res.status(404).json({error: 'id deve ser número.' });
//
//     const produto = produtosEmMemoria.find(p => p.id === id);
//     if(!produto) return res.status(404).json({error: 'Produto não encontrado.' });
//
//     res.json(produto);
// })

// api/vi/produtos
router.get('/', (req: Request,res: Response,next: NextFunction) => ctrl.listar(req,res,next));
router.post('/', (req: Request,res: Response,next: NextFunction) => ctrl.criar(req,res,next));

// api/vi/produtos/:id - por ID
router.get('/:id', (req: Request,res: Response,next: NextFunction) => ctrl.buscarPorId(req,res,next));
router.patch('/:id', (req:Request<IdParam, {}, UpdateProdutoDto>,res: Response,next: NextFunction) => ctrl.atualizar(req,res,next));
router.delete('/:id', (req:Request<IdParam>,res: Response,next: NextFunction) => ctrl.remover(req,res,next));

export default router;
