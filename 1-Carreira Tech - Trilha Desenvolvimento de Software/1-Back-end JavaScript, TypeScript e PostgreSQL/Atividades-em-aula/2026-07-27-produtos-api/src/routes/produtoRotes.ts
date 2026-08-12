import express, {Router, Request, Response} from "express";
import { Produto } from "../types/produto.types";

const router = Router();

// lista em memória. (hardcoded)
const produtosEmMemoria: Produto[] = [
    {
        id: 1,
        nome: 'Notebook Pro 17',
        preco: 4999.99,
        estoque: 10,
        ativo: true,
        criadoEm: new Date('2023-01-15T00:00:00.000Z'),
    },
    {
        id: 2,
        nome: 'Mouse games',
        preco: 249.99,
        estoque: 30,
        ativo: true,
        criadoEm: new Date('2023-01-19T00:00:00.000Z'),
    },
    {
        id: 3,
        nome: 'Teclado mecânico',
        preco: 399.98,
        estoque: 15,
        ativo: true,
        criadoEm: new Date('2023-01-11T00:00:00.000Z'),
    },
];
// GET api/vi/produtos
router.get('/', (req, res) => {
    res.json(produtosEmMemoria);
})


// GET api/vi/produtos/:id - busca por ID
router.get('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if(isNaN(id)) return res.status(404).json({error: 'id deve ser número.' });

    const produto = produtosEmMemoria.find(p => p.id === id);
    if(!produto) return res.status(404).json({error: 'Produto não encontrado.' });

    res.json(produto);
})

export default router;
