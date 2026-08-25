import {Request, Response} from "express";
import {AppDataSource} from "../database/data-source";
import {Product} from "../entities/Product";
import {Between, ILike, LessThan, Like, MoreThan} from "typeorm";
import {Category} from "../entities/Category";

export class ProdutoController {
    async create(req: Request, res: Response): Promise<Response> {

        const productRepository = AppDataSource.getRepository(Product)
        const categoryRepository = AppDataSource.getRepository(Category)

        const { nome, descricao, preco, estoque, categoryId } = req.body;

        const category = await categoryRepository.findOneBy({
            id: Number(categoryId)
        })
        if (!category) return res.status(404).json({message: "Categoria não encontrada"})


        const product = productRepository.create({ nome, descricao, preco, estoque, category })

        const savedProduct = await productRepository.save(product);

        return  res.status(201).json(savedProduct);
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)
        const products = await productRepository.find({
            relations: {
                category: true
            }
        })

        return res.status(200).json(products)
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)
        const id: number = Number(req.params.id)

        const product = await productRepository.findOne({
            where: { id },
            relations: {category: true}
        })
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
            },
            relations: {category: true}
        })

        if (!products || products.length === 0) {
            return res.status(404).json({message: `Produto não encontrado pelo nome ${nome}`})
        }

        return res.status(200).json(products)
    }

    /*
      DESAFIO 02
          Criar GET /products/stock/available
          Retornar todos os produtos com estoque maior que 0
  */
    async productsStockAvailable(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)

        const products = await productRepository.find({
            where: {
                estoque: MoreThan (0)
            },
            relations: {category: true}
        })

        if (!products || products.length === 0) {
            return res.status(404).json({message: `Não encontrado produto com estoque maior que zero.`})
        }

        return res.status(200).json(products)
    }

    /*
      DESAFIO 03
          Criar GET /products/stock/empty
          Retornar todos os produtos com estoque igual a 0
      */
    async productsStockEmpty(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)

        const products = await productRepository.find({
            where: {
                // estoque: LessThan (1)
                estoque: 0
            },
            relations: {category: true}
        })

        if (!products || products.length === 0) {
            return res.status(404).json({message: `Não encontrado produto com estoque zerado.`})
        }

        return res.status(200).json(products)
    }

    /*
       DESAFIO 04
           Criar GET /products/filter?min=10&max=100
           Retornar todos os produtos com preço entre min e max
   */
    async productsFilter(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)
        const minPrice = Number(req.query.minPrice ?? 0);
        const maxPrice = Number(req.query.maxPrice ?? 0);

        if (maxPrice == 0) return res.status(400).json({"message": "Campo max é obrigatório"})

        //Se min é maior que max
        if(minPrice > maxPrice){
            return res.status(400).json({
                message: "O valor mínimo não poder ser maior que o valor máximo"
            })
        }

        const products = await productRepository.find({
            where: {
                preco: Between(minPrice, maxPrice)
            },
            relations: {category: true}
        })

        if (!products || products.length === 0) {
            return res.status(404).json({message: `Não encontrado nenhum produto com filtro aplicado.`})
        }

        return res.status(200).json(products)
    }
}