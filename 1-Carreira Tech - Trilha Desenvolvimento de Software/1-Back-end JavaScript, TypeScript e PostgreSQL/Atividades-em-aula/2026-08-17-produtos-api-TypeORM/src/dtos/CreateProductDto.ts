import {IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min} from "class-validator";

export class CreateProductDto{
    @IsNotEmpty()
    @IsString()
    nome!: string;

    @IsNotEmpty()
    @IsString()
    descricao!: string;

    @IsNumber()
    @IsPositive()
    preco!: number;

    @IsInt()
    @Min(0)
    estoque!: number;

    @IsInt()
    @IsPositive()
    categoryId!: number;
}