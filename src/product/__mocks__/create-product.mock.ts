import { categoryMock } from "../../category/__mocks__/category.mock";
import { CreateProductDto } from "../dto/create-product.dto";


export const createProductMock: CreateProductDto = {
  categoryId: categoryMock.id,
  image: 'skgmlakskfdfnf',
  name: 'product name 1',
  price: 25
}