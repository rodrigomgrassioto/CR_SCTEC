import {Request, Response} from "express";
import {AppDataSource} from "../database/data-source";
import {Product} from "../entities/Product";
import {ILike, Like} from "typeorm";

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

    async update(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)
        const id: number = Number(req.params.id)

        let product = await productRepository.findOneBy({id})
        if (!product) {
            return res.status(404).json({message: 'Produto não encontrado'})
        }
        // await productRepository.update(id, req.body) // faz atualização diretamente no bd, tem q passar todos campos
        productRepository.merge(product, req.body) // faz mesclagem em memória
        const updatedProduct = await productRepository.save(product); // salva no bd


        return res.status(200).json(updatedProduct)
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)
        const id: number = Number(req.params.id)

        let product = await productRepository.findOneBy({id})
        if (!product) {
            return res.status(404).json({message: 'Produto não encontrado'})
        }
        await productRepository.remove(product)

        return res.status(204).send()
    }

    async findOneByNane(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)
        const nome: string = req.body.nome || "";
        if(!nome.trim()) return res.status(400).json({"message": "Campo nome é obrigatório"})

        // const product = await productRepository.findOneBy({nome}) // encontra somente se for exatamente igual
        const products = await productRepository.find({
            where: {
                // nome: Like(`%${nome}%`) // case sensitive
                nome: ILike(`%${nome}%`) // não diferencia maiúscula e minúscula
            }
        })

        if (!products || products.length === 0) {
            return res.status(404).json({message: `Produto não encontrado pelo nome ${nome}`})
        }

        return res.status(200).json(products)
    }
}