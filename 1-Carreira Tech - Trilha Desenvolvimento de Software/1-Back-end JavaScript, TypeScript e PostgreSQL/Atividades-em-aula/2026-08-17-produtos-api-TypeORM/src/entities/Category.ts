import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Product} from "./Product";

@Entity('categories')
export class Category{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar", {length: 100, nullable: false, unique: true})
    nome!: string;

    @Column("text", {nullable: false})
    descricao!: string;

    @OneToMany(
        () => Product, // entidade do outro lado do relacionamento
        product => product.category // qual propriedade/coluna do outro lado
    )
    @JoinColumn({name: "categoryId"})
    products!: Product[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}