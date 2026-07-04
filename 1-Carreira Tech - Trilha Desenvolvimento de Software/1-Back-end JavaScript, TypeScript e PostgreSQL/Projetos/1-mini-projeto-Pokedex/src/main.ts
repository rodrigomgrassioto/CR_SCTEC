import { PokeApiService } from "./services/PokeApiService.js";
import { TerminalController } from './controllers/TerminalController.js'
import {BoxService} from "./services/BoxService.js";

async function main() {
    // Instancia os serviços
    const apiService = new PokeApiService();
    const boxService = new BoxService(apiService);
    const terminalController = new TerminalController(boxService);

    // atender RF13
    // obs não tinha visto a não obrigatoriedade da criação do menu
    if(await boxService.buscarPokemonNaApiAddCatalogo("pikachu")){
        console.log('\'pikachu\' Cadastrado');
    }
    if(await boxService.buscarPokemonNaApiAddCatalogo("charmander")){
        console.log('\'charmander\' Cadastrado');
    }
    await boxService.buscarPokemonNaApiAddCatalogo("pikachu");
    await boxService.buscarPokemonNaApiAddCatalogo("pokemon-inexistente");
    console.table(await boxService.obterCatalogo());
    if (await boxService.removerPorId(25)){
        console.log('Pokémon ID 25 removido com sucesso');
    }
    console.table(await boxService.obterCatalogo());


    // Inicia o loop do menu
    await terminalController.iniciarMenu();
}

main();



