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

    async findAll(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)
        const products = await productRepository.find()

        return res.status(200).json(products)
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)
        const id: number = Number(req.params.id)

        const product = await productRepository.findOneBy({id})
        if (!product) {
            return res.status(404).json({message: 'Produto não encontrado'})
        }

        return res.status(200).json(product)
    }
}