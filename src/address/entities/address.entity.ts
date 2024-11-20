import { CityEntity } from "../../city/entities/city.entity"
import { UserEntity } from "../../user/entities/user.entity"
import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"

@Entity({ name: 'address_entity' })
export class AddressEntity {
  map(arg0: (address: any) => import("../dto/return-address.dto").ReturnAddressDto): import("../dto/return-address.dto").ReturnAddressDto[] {
    throw new Error("Method not implemented.")
  }
  @PrimaryGeneratedColumn('rowid')
  id: number

  @Column({ name: 'user_id', nullable: false})
  userId: number

  @Column({ name: 'complement', nullable: true})
  complement: string

  @Column({ name: 'number', nullable: false})
  numberAddress: number

  @Column({ name: 'cep', nullable: false})
  cep: string

  @Column({ name: 'city_id', nullable: false})
  cityId: number

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt:Date

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt:Date

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity

  @ManyToOne(() => CityEntity, (city) => city.addresses)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city?: CityEntity
}
