import { ProductEntity } from "../../product/entities/product.entity"
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, OneToMany,  } from "typeorm"

@Entity({name: 'category'})
export class CategoryEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number

  @Column({ name: 'name', nullable: false})
  name: string

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt:Date

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt:Date

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.category)
  products?: ProductEntity
}
