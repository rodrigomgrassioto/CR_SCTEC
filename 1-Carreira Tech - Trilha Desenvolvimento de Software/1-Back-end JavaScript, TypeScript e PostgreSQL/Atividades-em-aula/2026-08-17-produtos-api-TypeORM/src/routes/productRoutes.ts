import { Router } from "express";
import {ProdutoController} from "../controllers/ProdutoController";

const productRoutes = Router();
const productController = new ProdutoController();

productRoutes.post(
    '/products',
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
    (req, res) => productController.update(req, res)
)

productRoutes.delete(
    '/products/:id',
    (req, res) => productController.delete(req, res)
)

export default productRoutes;