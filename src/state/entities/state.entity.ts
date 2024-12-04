import { CityEntity } from "../../city/entities/city.entity"
import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, UpdateDateColumn, OneToMany } from "typeorm"

@Entity({ name: 'state' })
export class StateEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number

  @Column({ name: 'uf', nullable: false })
  uf: string;

  @Column({ name: 'name', nullable: true})
  name: string

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createAt:Date

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updateAt:Date

  @OneToMany(() => CityEntity, (city) => city.state)
  cities?: CityEntity[]
}
