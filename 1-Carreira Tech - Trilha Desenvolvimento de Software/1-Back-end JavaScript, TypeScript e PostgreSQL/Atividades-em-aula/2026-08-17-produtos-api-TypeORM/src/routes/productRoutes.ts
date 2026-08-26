import { Router } from "express";
import {ProdutoController} from "../controllers/ProdutoController";
import {validateDto} from "../middlewares/validate";
import {CreateProductDto} from "../dtos/CreateProductDto";
import {UpdateProductDto} from "../dtos/UpdateProductDto";

const productRoutes = Router();
const productController = new ProdutoController();

productRoutes.post(
    '/products',
    validateDto(CreateProductDto),
    (req, res) => productController.create(req, res)
)
productRoutes.get(
    '/products',
    (req, res) => productController.findAll(req, res)
)
productRoutes.post(
    '/products/find-by-name',
    (req, res) => productController.findOneByNane(req, res)
)

productRoutes.get(
    '/products/stock/available',
    (req, res) => productController.productsStockAvailable (req, res)
)

productRoutes.get(
    '/products/stock/empty',
    (req, res) => productController.productsStockEmpty(req, res)
)

productRoutes.get(
    '/products/filter',
    (req, res) => productController.productsFilter(req, res)
)

productRoutes.get(
    '/products/:id',
    (req, res) => productController.findOne(req, res)
)
productRoutes.put(
    '/products/:id',
    validateDto(UpdateProductDto),
    (req, res) => productController.update(req, res)
)

productRoutes.delete(
    '/products/:id',
    (req, res) => productController.delete(req, res)
)

export default productRoutes;