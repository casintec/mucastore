import { CityEntity } from "src/city/entities/city.entity"
import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, UpdateDateColumn, OneToMany } from "typeorm"

@Entity({ name: 'state_entity' })
export class StateEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number

  @Column({ name: 'name', nullable: true})
  name: string

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createAt:Date

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updateAt:Date

  @OneToMany(() => CityEntity, (city) => city.state)
  cities?: CityEntity[]
}
