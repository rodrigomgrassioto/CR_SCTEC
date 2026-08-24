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
productRoutes.get(
    '/products/:id',
    (req, res) => productController.findOne(req, res)
)

export default productRoutes;