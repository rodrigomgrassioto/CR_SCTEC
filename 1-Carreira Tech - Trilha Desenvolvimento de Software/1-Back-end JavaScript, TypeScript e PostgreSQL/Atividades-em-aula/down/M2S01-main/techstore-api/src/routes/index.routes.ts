import {Router, Request, Response} from "express";

const routers = Router();

routers.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "API TechStore funcionando!"
    })
})

routers.get("/sobre", (req: Request, res: Response) => {
    res.status(200).json({
        empresa: "TechStore",
        versao: "1.0.0",
        tecnologia: "Node.js, Express e TypeScript"
    })
})

routers.get("/status", (req: Request, res: Response) => {
    res.status(200).json({
        status: "Sistema disponível",
    })
})

routers.get("/produtos", (req: Request, res: Response) => {
    const produtos = [
        {
            id: 1,
            nome: "Notebook Gamer",
            preco: 5000.00
        },
        {
            id: 2,
            nome: "Teclado Gamer",
            preco: 499.00
        },
        {
            id: 3,
            nome: "Mouse Gamer",
            preco: 200.00
        }
    ]

    res.status(200).json(produtos)
})

routers.get("/categorias", (req: Request, res: Response) => {
    const categorias = [
        {
            id: 1,
            nome: "Informática",
        },
        {
            id: 2,
            nome: "Cama mesa",
        },
        {
            id: 3,
            nome: "Banho",
        }
    ]

    res.status(200).json(categorias)
})

routers.get("/clientes", (req: Request, res: Response) => {
    const clientes = [
        {
            id: 1,
            nome: "Rodrigo",
        },
        {
            id: 2,
            nome: "Carla",
        },
        {
            id: 3,
            nome: "Kiki",
        }
    ]

    res.status(200).json(clientes)
})

export default routers;