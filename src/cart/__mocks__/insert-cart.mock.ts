import { productMock } from "../../product/__mocks__/product.mock";
import { InsertCartDto } from "../dto/insert-cart.dto";

export const insertCartMock: InsertCartDto = {
  amount: 532,
  productId: productMock.id
}