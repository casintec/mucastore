import { IsNumber } from "class-validator";
import { ReturnCartProductDto } from "../../cart-product/dto/return-cart-product.dto";
import { CartEntity } from "../entities/cart.entity";

export class ReturnCartDto {
  id: number;
  cartProduct?: ReturnCartProductDto[];

  constructor(cart: CartEntity) {
    this.id = cart.id;
    this.cartProduct = cart.cartProduct
      ? cart.cartProduct.map(
          (cartProduct) => new ReturnCartProductDto(cartProduct),
        )
      : undefined;
  }
}