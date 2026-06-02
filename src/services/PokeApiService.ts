// src/services/PokeApiService.ts
import type { PokemonApiResponse, PokemonResumo } from "../models/Pokemon.js";

export class PokeApiService {
    /**
     * RF04 – Buscar Pokémon na PokeAPI
     * Consulta a API externa e retorna os dados formatados ou null em caso de erro.
     * Pág 07
     */
    async buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
        // Converte para letras minúsculas, pois a PokeAPI não aceita letras maiúsculas na URL
        const termoBusca = nomeOuId.toLowerCase().trim();

        // url disponível na pág 5
        const url = `https://pokeapi.co/api/v2/pokemon/${termoBusca}`;

        try {
            const resposta = await fetch(url);

            // Trata o erro quando o Pokémon não existir (HTTP 404) ou qualquer outra falha
            if (!resposta.ok) {
                console.log("[ERRO] Pokémon não encontrado.");
                return null;
            }

            // Captura os dados brutos tipados de acordo com o contrato da API
            const dadosBrutos: PokemonApiResponse = await resposta.json();

            // Mapeia e transforma os dados brutos para o formato resumido exigido pelo projeto
            const pokemonFormatado: PokemonResumo = {
                id: dadosBrutos.id,
                nome: dadosBrutos.name,
                tipos: dadosBrutos.types.map(info => info.type.name),
                altura: dadosBrutos.height,
                peso: dadosBrutos.weight
            };

            return pokemonFormatado;
        } catch (error) {
            console.log("[ERRO] Não foi possível buscar o Pokémon.");
            return null;
        }
    }
}
