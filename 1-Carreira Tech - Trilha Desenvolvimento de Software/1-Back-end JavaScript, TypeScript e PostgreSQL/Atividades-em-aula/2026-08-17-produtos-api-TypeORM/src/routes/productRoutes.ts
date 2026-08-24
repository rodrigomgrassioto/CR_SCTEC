import { Router } from "express";
import {ProdutoController} from "../controllers/ProdutoController";

const productRoutes = Router();
const productController = new ProdutoController();

productRoutes.post(
    '/products',
    (req, res) => productController.create(req, res)
)

export default productRoutes;