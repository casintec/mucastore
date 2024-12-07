import { productMock } from "../../product/__mocks__/product.mock";
import { UpdateCartDto } from "../dto/update-cart.dto";

export const updateCartMock: UpdateCartDto = {
  amount: 532,
  productId: productMock.id
}