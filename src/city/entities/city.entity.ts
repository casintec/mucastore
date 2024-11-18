import { AddressEntity } from "src/address/entities/address.entity"
import { StateEntity } from "src/state/entities/state.entity"
import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm"

@Entity({ name: 'city_entity' })
export class CityEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number

  @Column({ name: 'state_entity_id', nullable: false})
  stateId: number

  @Column({ name: 'name', nullable: false})
  name: string

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt:Date

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt:Date

  @OneToMany(() => AddressEntity, (address) => address.city)
  addresses?: AddressEntity[]

  @ManyToOne(() => StateEntity, (state) => state.cities)
  @JoinColumn({ name: 'state_entity_id', referencedColumnName: 'id' })
  state?: StateEntity
}
