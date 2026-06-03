// import packageJson from "../package.json" with { type: "json" };
//
// const mensagem: string = "Olá, mundo! Pokedex em TypeScript funcionando! 🚀";
//
// function exibirDados(texto: string, versao: string): void {
//     console.log(`${texto} (v${versao})`);
// }
//
// exibirDados(mensagem, packageJson.version);

import { PokeApiService } from "./services/PokeApiService.js";
import type {PokemonResumo} from "./models/Pokemon.js";

const apiService = new PokeApiService();

async function rodarTeste() {
    let catalogo: PokemonResumo[] = [
        {id: 25, 'nome': 'pikachu', altura: 4, peso: 60, tipos: ['electric']}
    ];
    console.log("Buscando o Pokémon Pikachu...");
    const pokemon = await apiService.buscarPokemon("26");

    if (pokemon) {
        catalogo.push(pokemon);
        console.log("Sucesso! Retorno mapeado:", pokemon);
    // } else {
    //     console.log("Pokémon não encontrado.");
    }
    console.log('Pokémons consultados');
    console.log(pokemon)

}

rodarTeste();

