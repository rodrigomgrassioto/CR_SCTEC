
import {Produto, CreateProdutoDto, UpdateProdutoDto} from "../types/produto.types";
import {IProdutoRepository} from "./IProdutoRepository";
import {Pool} from "pg";

export class ProdutoRepository implements IProdutoRepository {
    constructor(private db:Pool) { }

    async findAll(): Promise<Produto[]>{
        const {rows} = await this.db.query<Produto>(
            'SELECT * FROM produtos WHERE ativo = true ORDER BY name',
        )
        return rows
    }

    async findById(id: number): Promise<Produto> {
        const { rows } = await this.db.query<Produto>(
            'SELECT * FROM produtos WHERE id = $1',[id]
        )
        if (!rows[0]) {
            throw new Error('Falha ao buscar produto');
        }
        return rows[0];
    }

    async findByNome(nome: string): Promise<Produto | null> {
        const { rows } = await this.db.query<Produto>(
            'SELECT * FROM produtos WHERE nome ILIKE $1',[nome]
        )
        return rows[0] ?? null;
    }

    async create(dto: CreateProdutoDto): Promise<Produto>{
        const { rows } = await this.db.query<Produto>(
            'INSERT INTO produtos (nome, preco, estoque) VALUES ($1, $2, $3) RETURNING *',
            [dto.nome, dto.preco, dto.estoque]
        )

        if (!rows[0]) {
            throw new Error('Falha ao criar o produto');
        }
        return rows[0];
    };

    async update(id: number, dto: UpdateProdutoDto): Promise<Produto | null> {
        const { rows } = await this.db.query<Produto>(
            `UPDATE produtos
                SET nome = COALESCE($1, nome),
                    preco = COALESCE($2, preco),
                    estoque = COALESCE($3, estoque),
                    ativo = COALESCE($4, ativo)
                WHERE id = $5 RETURNING *`,
            [dto.nome, dto.preco, dto.estoque, dto.ativo, id]
        )
        return rows[0] ?? null;

    }
    async delete(id: number): Promise<void> {
        const { rows } = await this.db.query<Produto>(
            // retorna como estava o produto antes de ser excluído
            // possibilitando fazer  if (rows.length === 0) e return rows
            // `-- DELETE FROM produtos WHERE id = $1 RETURNING *`,
            `-- DELETE FROM produtos WHERE id = $1`,[id]
        )



    }
}