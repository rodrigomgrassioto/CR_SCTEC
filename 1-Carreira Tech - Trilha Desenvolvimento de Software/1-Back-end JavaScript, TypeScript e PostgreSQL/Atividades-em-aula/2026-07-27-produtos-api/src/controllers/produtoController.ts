import { Request, Response, NextFunction } from 'express';
import { ProdutoService } from "../services/produtoService";
import { Produto, CreateProdutoDto, UpdateProdutoDto } from "../types/produto.types";

export type IdParam = { id: string }

export class ProdutoController {
    constructor(private service: ProdutoService) {}

    // GET /api/v1/produtos
    async listar(req: Request, res:Response, next:NextFunction): Promise<void> {
        try {
            const produtos: Produto[] = await this.service.listarTodos();
            res.json(produtos);

        } catch (err){
            next(err) // equivalente a res.status(500).json({message: err})
        }
    }

    // GET /api/v1/produtos/:id
    async buscarPorId(req: Request, res:Response, next:NextFunction): Promise<void> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) res.status(400).json({error: 'Id deve ser número inteiro'})
            const produto = await this.service.buscarPorId(id);
            res.json(produto);
        } catch (err){
            next(err) // equivalente a res.status(500).json({message: err})
        }
    }

    // POST /api/v1/produtos
    async criar(req: Request, res:Response, next:NextFunction): Promise<void> {
        try {
            const { nome, preco, estoque} = req.body;
            if (!nome || preco === undefined || estoque === undefined)
                res.status(400).json({error: 'Os campos nome, preço e estoque são obrigatórios'})
            const novoProduto = await this.service.criar({nome, preco, estoque});
            res.status(201).json(novoProduto);
        } catch (err){
            next(err) // equivalente a res.status(500).json({message: err})
        }
    }

    // PATCH /api/v1/produtos/:id
    // Tipar ID e Body do request
    async atualizar(req: Request<IdParam, {}, UpdateProdutoDto>, res:Response, next:NextFunction): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            if (isNaN(id)) res.status(400).json({error: 'Id deve ser número inteiro'})

            // req.body aqui já é um UpdataProdutoDto
            const produtoAtualizado = await this.service.atualizar(id, req.body)
            res.json(produtoAtualizado);
        } catch (err){
            next(err) // equivalente a res.status(500).json({message: err})
        }
    }

    // DELETE /api/v1/produtos/:id
    async remover(req: Request<IdParam>, res:Response, next:NextFunction): Promise<void> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) res.status(400).json({error: 'Id deve ser número inteiro'})
            await this.service.remover(id);
            res.status(204).send() // 204 não aceita body (json)
        } catch (err){
            next(err) // equivalente a res.status(500).json({message: err})
        }
    }
}