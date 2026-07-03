import {PokeApiService} from "./PokeApiService.js";
import * as fs from "node:fs/promises";
import { Pokemon, type PokemonResumo } from "../models/Pokemon.js";

export class BoxService {
    constructor(
        private apiService: PokeApiService
    ) {
        this.carregarJson();
    }

    private catalogo: PokemonResumo[] = [];
    private readonly caminhoArquivo = "./pc_box.json";

    obterCatalogo(): PokemonResumo[] {
        return this.catalogo;
    }

    async buscarPokemonNaApiAddCatalogo(termo: string): Promise<boolean> {
        const pokemon: PokemonResumo|null = await this.apiService.buscarPokemon(termo.toLowerCase().trim());

        if (!pokemon) return false

        // RF 08 - Regra obrigatória - Pág 9
        if (this.catalogo.some(p => p.id == pokemon.id)) { // RF11
            // console.clear() // removido para tender a RF13 no main.ts
            console.log(`☢️  Pokemon ID/Nome "${termo}" já cadastrado!`)
            return false
        }
        this.catalogo.push(pokemon);
        return true;
    }

    removerPorId(id: number): boolean {
        // const index = this.catalogo.findIndex(p => p.id === id); // RF11??
        // console.log(`index é: ${index}`);

        // if (index === -1) {
        //     console.log('☢️  ID não encontrado!')
        //     return false;
        // }

        // atualizado código para atender a RF11
        const pokemon = this.catalogo.find(p => p.id === id); // RF11
        if (!pokemon) {
            console.log('☢️  ID não encontrado!');
            return false;
        }
        const index = this.catalogo.indexOf(pokemon);

        this.catalogo.splice(index, 1);
        return true;
    }

    async salvarJson () :Promise<boolean> {
        const result = await fs.writeFile(this.caminhoArquivo, JSON.stringify(this.catalogo, null, 2), "utf-8");
        return true
    }

    async carregarJson(): Promise<void> {
        try {
            const conteudo = await fs.readFile(this.caminhoArquivo, "utf-8");
            const conteudoLimpo = conteudo.trim();

            // Se o arquivo estiver em branco
            if (conteudoLimpo === "") {
                this.catalogo = [];
                return;
            }
            this.catalogo = JSON.parse(conteudoLimpo);

        } catch (error: any) {
            // Se o arquivo nem sequer existir, inicializa vazio tranquilamente
            if (error.code === 'ENOENT') {
                this.catalogo = [];
                return;
            }

            // Captura apenas erros reais (como um JSON corrompido ex: "[{id: 1,")
            console.error("❌ Arquivo corrompido ou inválido. Iniciando catálogo vazio. Erro:", error.message);
            this.catalogo = [];
        }
    }

}