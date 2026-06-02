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

const apiService = new PokeApiService();

async function rodarTeste() {
    console.log("Buscando o Pokémon Pikachu...");
    const pokemon = await apiService.buscarPokemon("Pikachu");

    if (pokemon) {
        console.log("Sucesso! Retorno mapeado:", pokemon);
    // } else {
    //     console.log("Pokémon não encontrado.");
    }
}

rodarTeste();

