import { categoryMock } from "src/category/__mocks__/category.mock";
import { UpdateProductDto } from "../dto/update-product.dto";

export const updateProductMock: UpdateProductDto = {
  categoryId: categoryMock.id,
  image: 'update product',
  name: 'updated product name 1',
  price: 43
}