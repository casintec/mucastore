import { ReturnOrderProductDto } from '../../order-product/dto/return-order-product.dto';
import { ReturnAddressDto } from '../../address/dto/return-address.dto';
import { ReturnPaymentDto } from '../../payment/dto/return-payment.dto';
import { ReturnUserCreateUserDto } from '../../user/dto/return-user-create-user.dto';
import { OrderEntity } from '../entities/order.entity';

export class ReturnOrderDto {
  id: number;
  date: string;
  userId: number;
  addressId: number;
  paymentId: number;
  user?: ReturnUserCreateUserDto;
  address?: ReturnAddressDto;
  payment?: ReturnPaymentDto;
  ordersProduct?: ReturnOrderProductDto[];
  amountProducts?: number;

  constructor(order?: OrderEntity) {
    this.id = order?.id;
    this.date = order?.date.toString();
    this.userId = order?.userId;
    this.addressId = order?.addressId;
    this.paymentId = order?.paymentId;
    this.user = order?.user ? new ReturnUserCreateUserDto(order?.user) : undefined;
    this.address = order?.address
      ? new ReturnAddressDto(order?.address)
      : undefined;
    this.payment = order?.payment
      ? new ReturnPaymentDto(order?.payment)
      : undefined;
    this.ordersProduct = order?.ordersProduct
      ? order?.ordersProduct.map(
          (orderProduct) => new ReturnOrderProductDto(orderProduct),
        )
      : undefined;
    this.amountProducts = order?.amountProducts;
  }
}