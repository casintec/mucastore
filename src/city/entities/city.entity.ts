import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm"

@Entity({ name: 'city_entity' })
export class CityEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number

  @Column({ name: 'state_entity_id', nullable: false})
  stateId: number

  @Column({ name: 'name', nullable: true})
  name: string

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt:Date

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt:Date
}
