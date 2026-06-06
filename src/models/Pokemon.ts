// RF02 – Criar uma interface para o Pokémon resumido - pg 6
export interface PokemonResumo {
    id: number;
    nome: string;
    tipos: string[];
    altura: number;
    peso: number;
}

// RF03 – Criar uma interface para o retorno da API - pg 6 e 7
export interface PokemonApiResponse {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: {
        type: {
            name: string;
        };
    }[];
}

// visto na aula do dia 02/06/2026
export class Pokemon implements PokemonResumo {
    id: number;
    nome: string;
    tipos: string[];
    altura: number;
    peso: number;

    constructor(apiData: PokemonApiResponse) {
        this.id = apiData.id;
        // Primeira letra maiúscula
        this.nome = apiData.name.charAt(0).toUpperCase() + apiData.name.slice(1);
        this.tipos = apiData.types.map(t => t.type.name); // RF11
        this.altura = apiData.height;
        this.peso = apiData.weight;
    }
}