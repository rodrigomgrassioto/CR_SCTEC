import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Category} from "./Category";

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

    @ManyToOne(
        () => Category,
        category => category.products
    )
    category!: Category;

}