import {Produto,  CreateProdutoDto, UpdateProdutoDto} from "../types/produto.types";
import {IProdutoRepository} from "../repositories/IProdutoRepository";
import {ProdutoRepository} from "../repositories/ProdutoRepository";
import {AppError} from "../types/appError";

export class ProdutoService {

    constructor(private repo: ProdutoRepository) {}

    async listarTodos(): Promise<Produto[]>{
        return this.repo.findAll()
    }
    async buscarPorId(id:number): Promise<Produto | null>{
        const produto = this.repo.findById(id)
        if(!produto) throw new AppError("Produto não encontrado", 404);
        return produto;
    }
    async criar(dto: CreateProdutoDto): Promise<Produto>{
        // Regra de negócio 1: Preço deve ser maior que zero
        if (dto.preco <= 0) throw new AppError("Preço deve ser maior que zero", 400)

        // Regra de negócio 2: Nome deve ser único
        const existe = await this.repo.findByNome(dto.nome);
        if (existe) throw new AppError(`Já existe produto com o nome "${dto.nome}"`, 409);

        return this.repo.create(dto);
    }
    async atualizar(id: number, dto: UpdateProdutoDto): Promise<Produto | null>{
        await this.repo.findById(id);

        // regra de negócio, se enviado preço, ele deve ser positivo
        if (dto.preco !== undefined && dto.preco <= 0) throw new AppError("Preço deve ser maior que zero", 400)

        return this.repo.update(id, dto);
    }
    async remover(id: number): Promise<void>{
        await this.repo.findById(id);
        await this.repo.delete(id);

    }

    }