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
// import type {PokemonResumo} from "./models/Pokemon.js";


//
// rodarTeste();

import { TerminalController } from './controllers/TerminalController.js'
import {BoxService} from "./services/BoxService.js";

async function main() {
    // Instancia os serviços
    const apiService = new PokeApiService();
    const boxService = new BoxService(apiService);
    const terminalController = new TerminalController(boxService);


    // Inicia o loop do menu
    await terminalController.iniciarMenu();
}

main();



