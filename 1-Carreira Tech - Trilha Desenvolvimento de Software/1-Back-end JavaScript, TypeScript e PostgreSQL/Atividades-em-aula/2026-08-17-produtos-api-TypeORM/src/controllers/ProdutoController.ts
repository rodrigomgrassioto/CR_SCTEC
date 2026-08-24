import {Request, Response} from "express";
import {AppDataSource} from "../database/data-source";
import {Product} from "../entities/Product";

export class ProdutoController {
    async create(req: Request, res: Response): Promise<Response> {

        const productRepository = AppDataSource.getRepository(Product)
        const product = productRepository.create(req.body)

        const savedProduct = await productRepository.save(product);

        return  res.status(201).json(savedProduct);
    }
}