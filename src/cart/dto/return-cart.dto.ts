import { IsNumber } from "class-validator";
import { ReturnCartProductDTO } from "../../cart-product/dto/return-cart-product.dto";
import { CartEntity } from "../entities/cart.entity";

export class ReturnCartDto {
  id: number;
  cartProduct?: ReturnCartProductDTO[];

  constructor(cart: CartEntity) {
    this.id = cart.id;
    this.cartProduct = cart.cartProduct
      ? cart.cartProduct.map(
          (cartProduct) => new ReturnCartProductDTO(cartProduct),
        )
      : undefined;
  }
}