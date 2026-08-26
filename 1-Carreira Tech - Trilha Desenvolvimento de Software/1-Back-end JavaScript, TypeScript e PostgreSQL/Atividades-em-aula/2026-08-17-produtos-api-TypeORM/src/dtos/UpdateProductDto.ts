import {IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min} from "class-validator";

export class UpdateProductDto{
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    nome?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    descricao?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    preco?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    estoque?: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    categoryId?: number;
}