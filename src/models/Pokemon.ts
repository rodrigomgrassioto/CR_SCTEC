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