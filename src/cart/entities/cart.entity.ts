import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class CartEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number

  @Column({ name: 'user_id', nullable: false})
  userId: string

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date

  @UpdateDateColumn({ name: 'update_at'})
  updatedAt: Date

}
