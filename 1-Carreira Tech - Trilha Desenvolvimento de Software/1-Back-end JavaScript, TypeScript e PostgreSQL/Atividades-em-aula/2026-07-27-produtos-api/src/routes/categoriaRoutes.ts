import {Router, Request, Response, NextFunction} from "express";


import {UpdateProdutoDto} from "../types/produto.types";

// const repo = new ProdutoRepository(pool);
// const service = new ProdutoService(repo)
// const ctrl = new ProdutoController(service);

const router = Router();

// api/v1/categorias
router.get('/', (req: Request,res: Response,next: NextFunction) => ctrl.listar(req,res,next));
router.post('/', (req: Request,res: Response,next: NextFunction) => ctrl.criar(req,res,next));

// api/v1/categorias/:id - por ID
router.get('/:id', (req: Request,res: Response,next: NextFunction) => ctrl.buscarPorId(req,res,next));
router.patch('/:id', (req:Request<IdParam, {}, UpdateProdutoDto>,res: Response,next: NextFunction) => ctrl.atualizar(req,res,next));
router.delete('/:id', (req:Request<IdParam>,res: Response,next: NextFunction) => ctrl.remover(req,res,next));

export default router;
 