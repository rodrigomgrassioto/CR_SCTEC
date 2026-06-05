import {PokeApiService} from "../services/PokeApiService.js";
import { Pokemon, type PokemonResumo } from "../models/Pokemon.js";

export class BoxService {
    constructor(
        private apiService: PokeApiService
    ) {    }

    private catalogo: PokemonResumo[] = [
        // {id: 25, 'nome': 'pikachu', altura: 4, peso: 60, tipos: ['electric']}
    ];

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
        this.catalogo.push(pokemon);
        return true;
    }
}