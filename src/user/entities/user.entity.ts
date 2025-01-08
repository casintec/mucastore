import { OrderEntity } from "../../order/entities/order.entity"
import { AddressEntity } from "../../address/entities/address.entity"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number

  @Column({ name: 'name', nullable: false})
  name: string

  @Column({ name: 'email', nullable: false})
  email: string

  @Column({ name: 'phone'})
  phone: string

  @Column({ name: 'cpf', nullable: false})
  cpf: string

  @Column({ name: 'password', nullable: false})
  password: string

  @Column({ name: 'type_user', nullable: false})
  typeUser: number

  @CreateDateColumn({ name: 'create_at', nullable: false })
  create_at:Date

  @UpdateDateColumn({ name: 'update_at', nullable: false })
  update_at:Date

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses?: AddressEntity

  @OneToMany(() => OrderEntity, (order) => order.address)
  orders?: OrderEntity[];
}
