import * as readline from "readline";
import {BoxService} from "../services/BoxService.js";

// import {Pokemon, type PokemonResumo} from "../models/Pokemon.js";

export class TerminalController {
    private rl: readline.Interface;

    constructor(
        private boxService: BoxService,
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
            console.log('\n🟦 --- MENU INICIAL POKÉMON --- 🟦');
            console.log('1. Adicionar Pokémon');
            console.log('2. Listar Pokémons');
            console.log('3. Remover Pokémons');
            console.log('S. Sair');

            const opcao = await this.perguntar('Escolha uma opção: ');

            switch (opcao.toLowerCase()) {
                case '1':
                    continuar = false;
                    console.clear()
                    // console.log('\n[Adicionando novo Pokémon]');
                    // this.buscarPokemonNaApiAddCatalogo();
                    this.subMenuAdicionar();
                    // console.log('adicionado com sucesso!');
                    break;

                case '2':
                    console.log('\n[Seu Catálogo Atual]');
                    if (this.boxService.obterCatalogo().length === 0) {
                        console.log('O catálogo está vazio.');
                    } else {
                        console.table(this.boxService.obterCatalogo());
                    }
                    break;

                case '3':
                    continuar = false
                    console.clear()
                    console.log('\n 🟦 R E M O V E R !!! 🟦');
                    if (this.boxService.obterCatalogo().length === 0) {
                        console.log('❌ O catálogo está vazio.');
                        continuar = true;
                    } else {
                        console.table(this.boxService.obterCatalogo());
                        continuar = false;
                        this.subMenuRemoverPorId()
                    }
                    break;

                case 's':
                    console.clear()
                    console.log('👋 👋 👋  Até mais!');
                    continuar = false;
                    this.rl.close(); // Fecha a interface do terminal
                    break;

                default:
                    console.clear()
                    console.log('❌ Opção inválida! Tente novamente.');
                    break;
            }
        }
    }

    private async subMenuAdicionar(): Promise<void> {
        console.log('\n 🟦 --- ADICIONAR POKÉMON --- 🟦');
        const termo = await this.perguntar('❓ Nome ou ID para adicionar: ');

        if (!termo.trim()) {
            console.log('❌ Entrada não pode ser vazia!');
            this.iniciarMenu()
            return;
        }
        console.log(`Buscando "${termo}" na PokéAPI...`);
        const retApi = await this.boxService.buscarPokemonNaApiAddCatalogo(termo);
        if (!retApi) {
            // console.clear();
            console.log('❌ Erro ao consultar Pokémon, verifique o ID/Nome');
            this.iniciarMenu()
            return;
        }
        // console.clear();
        console.log('✅ Pokémon adicionado ao catálogo');
        this.iniciarMenu()
        return;

    }

    private async subMenuRemoverPorId(): Promise<void> {
        console.log('\n 🟦 --- REMOVER POKÉMON --- 🟦');
        const termo = await this.perguntar('❓ ID a remover: ');
        if (!termo.trim()) {
            console.log('❌ Entrada não pode ser vazia!');
            this.iniciarMenu();
            return;
        }

        const termoNumber = +termo.trim();
        if (isNaN(termoNumber)) {
            console.log('❌ O ID precisa ser um número válido!');
            this.iniciarMenu();
            return;
        }
        const retornoRemocao = await this.boxService.removerPorId(termoNumber);
        console.log(retornoRemocao)

    }

// Executa o menu
//     iniciarMenu();
}
