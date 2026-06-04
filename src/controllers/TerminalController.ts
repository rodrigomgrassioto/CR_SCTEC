import * as readline from "readline";
import {PokeApiService} from "../services/PokeApiService.js";
import type {PokemonResumo} from "../models/Pokemon.js";

export class TerminalController {
    constructor(
        private apiService: PokeApiService
    ){}

    async iniciar(): Promise<void> {
        // Configuração da interface do terminal
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // váriável do MENU
        const perguntar = (texto: string): Promise<string> => {
            return new Promise((resolve) => rl.question(texto, resolve));
        };

        // Menu
        async function iniciarMenu() {
            let continuar = true;

            while (continuar) {
                console.log('\n--- MENU DO CATÁLOGO POKÉMON ---');
                console.log('1. Adicionar Pokémon');
                console.log('2. Listar Pokémons');
                console.log('3. Remover Pokémons');
                console.log('S. Sair');

                const opcao = await perguntar('Escolha uma opção: ');

                switch (opcao) {
                    case '1':
                        console.log('\n[Adicionando novo Pokémon]');


                        // Adicionando ao array
                        rodarTeste();
                        // console.log('adicionado com sucesso!');
                        break;

                    case '2':
                        console.log('\n[Seu Catálogo Atual]');
                        if (catalogo.length === 0) {
                            console.log('O catálogo está vazio.');
                        } else {
                            console.table(catalogo); // Exibe os dados em formato de tabela no terminal!
                        }
                        break;

                    case '3':
                        console.log('\n[Remover]');
                        if (catalogo.length === 0) {
                            console.log('O catálogo está vazio.');
                        } else {
                            console.table(catalogo); // Exibe os dados em formato de tabela no terminal!
                        }
                        break;

                    case 'S':
                    case 's':
                        console.log('Saindo do programa... Até mais!');
                        continuar = false;
                        rl.close(); // Fecha a interface do terminal
                        break;

                    default:
                        console.log('Opção inválida! Tente novamente.');
                        break;
                }
            }
        }

    }

    // const apiService = new PokeApiService();

    let catalogo: PokemonResumo[] = [
        // {id: 25, 'nome': 'pikachu', altura: 4, peso: 60, tipos: ['electric']}
    ];
    async function rodarTeste() {
        console.log("Buscando o Pokémon Pikachu...");
        const pokemon = await apiService.buscarPokemon("26");

        if (pokemon) {
            catalogo.push(pokemon);
            console.log("Sucesso! Retorno mapeado:", pokemon);
            // } else {
            //     console.log("Pokémon não encontrado.");
        }
        // console.log('Pokémons consultados');
        // console.log(pokemon)

    }

// Executa o menu
    iniciarMenu();
}
