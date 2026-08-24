import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', {length: 150, nullable: false, unique: true })
    nome!: string;

    @Column('varchar', {length: 255, nullable: false })
    descricao!: string;

    @Column('decimal',{ precision: 10, scale: 2,  nullable: false } )
    preco!: number;

    @Column('int', {default: 0})
    estoque!: number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}