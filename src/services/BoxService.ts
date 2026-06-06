import {PokeApiService} from "./PokeApiService.js";
import * as fs from "node:fs/promises";
import { Pokemon, type PokemonResumo } from "../models/Pokemon.js";

export class BoxService {
    constructor(
        private apiService: PokeApiService
    ) {    }

    private catalogo: PokemonResumo[] = [
        // {id: 25, 'nome': 'pikachu', altura: 4, peso: 60, tipos: ['electric']}
    ];
    private readonly caminhoArquivo = "../../pc_box.json";

    obterCatalogo(): PokemonResumo[] {
        return this.catalogo;
    }

    async buscarPokemonNaApiAddCatalogo(termo: string): Promise<boolean> {
        // console.log(`Buscando o Pokémon pelo ID/Nome ${termo}...`);
        const pokemon: PokemonResumo|null = await this.apiService.buscarPokemon(termo.toLowerCase().trim());

        // console.log(pokemon)

        if (!pokemon) {
            // console.log('poke não encontrado')
            return false
        }
        // console.log('pokemon.id')
        // console.log(pokemon.id)
        // console.log('this.catalogo.id')
        // console.log()
        // RF 08 - Regra obrigatória - Pág 9
        if (this.catalogo.some(p => p.id == pokemon.id)) { // RF11
            console.clear()
            console.log('☢️  Pokemon já cadastrado!')
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

    salvarCatalogo (): boolean {
        const result = fs.writeFile(this.caminhoArquivo, JSON.stringify(this.catalogo, null, 2), "utf-8");
        console.log(result);
        return true
    }
}