import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from "typeorm";
import { PaymentEntity } from "../../payment/entities/payment.entity"

export class PaymentStatusEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => PaymentEntity, (payment) => payment.paymentStatus)
  payments?: PaymentEntity[];
}
