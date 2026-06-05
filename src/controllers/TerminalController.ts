import * as readline from "readline";
import {PokeApiService} from "../services/PokeApiService.js";
import {Pokemon, type PokemonResumo} from "../models/Pokemon.js";

export class TerminalController {
    private rl: readline.Interface;
    private catalogo: PokemonResumo[] = [
        {id: 25, 'nome': 'pikachu', altura: 4, peso: 60, tipos: ['electric']}
    ];

    constructor(
        private apiService: PokeApiService
    ){
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // váriável do MENU
    private perguntar = (texto: string): Promise<string> => {
        return new Promise((resolve) =>  this.rl.question(texto, resolve));
    };

    // Menu
    async iniciarMenu(): Promise<void> {
        let continuar = true;

        while (continuar) {
            console.log('\n--- MENU DO CATÁLOGO POKÉMON ---');
            console.log('1. Adicionar Pokémon');
            console.log('2. Listar Pokémons');
            console.log('3. Remover Pokémons');
            console.log('S. Sair');

            const opcao = await this.perguntar('Escolha uma opção: ');

            switch (opcao.toLowerCase()) {
                case '1':
                    console.log('\n[Adicionando novo Pokémon]');
                    // this.buscarPokemonNaApiAddCatalogo();
                    this.subMenuAdicionar();
                    // console.log('adicionado com sucesso!');
                    break;

                case '2':
                    console.log('\n[Seu Catálogo Atual]');
                    if (this.catalogo.length === 0) {
                        console.log('O catálogo está vazio.');
                    } else {
                        console.table(this.catalogo);
                    }
                    break;

                case '3':
                    console.log('\n[Remover]');
                    if (this.catalogo.length === 0) {
                        console.log('O catálogo está vazio.');
                    } else {
                        console.table(this.catalogo);
                    }
                    break;

                case 's':
                    console.log('Saindo do programa... Até mais!');
                    continuar = false;
                    this.rl.close(); // Fecha a interface do terminal
                    break;

                default:
                    console.log('Opção inválida! Tente novamente.');
                    break;
            }
        }
    }

    private async subMenuAdicionar(): Promise<void> {
        console.log('\n--- ADICIONAR POKÉMON ---');
        const termo = await this.perguntar('Digite o Nome ou ID: ');

        if (!termo.trim()) {
            console.log('❌ Entrada não pode ser vazia!');
            return;
        }
        console.log(`Buscando "${termo}" na PokéAPI...`);
        const retApi = this.buscarPokemonNaApiAddCatalogo(termo);
        console.log(`O retorno da api é: ${retApi}`)

    }

    private async buscarPokemonNaApiAddCatalogo(termo: string): Promise<boolean> {
        console.log(`Buscando o Pokémon pelo ID/Nome ${termo}...`);
        const pokemon: PokemonResumo|null = await this.apiService.buscarPokemon(termo.toLowerCase().trim());

        if (!pokemon) {
            console.log('poke não encontrado')
            return false
        }
        return true;
    }

// Executa o menu
//     iniciarMenu();
}
