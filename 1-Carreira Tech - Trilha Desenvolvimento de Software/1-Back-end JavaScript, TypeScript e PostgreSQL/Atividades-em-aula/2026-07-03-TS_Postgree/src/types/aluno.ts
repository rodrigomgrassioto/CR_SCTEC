export interface Aluno {
    id: number;
    nome: string;
    email: string;
    curso: string | null;
    criado_em: Date
}