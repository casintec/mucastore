import { Test, TestingModule } from "@nestjs/testing"
import { CartProductService } from "../cart-product.service"
import { ProductService } from "../../product/product.service"
import { Repository } from "typeorm"
import { CartProductEntity } from "../entities/cart-product.entity"
import { getRepositoryToken } from "@nestjs/typeorm"
import { productMock } from "../../product/__mocks__/product.mock"
import { returnDeletedMock } from "../../__mocks__/return-deleted-items.mock"
import { cartMock } from "../../cart/__mocks__/cart.mock"

describe('CartProductService', () => {

  let service: CartProductService
  let productService: ProductService
  let cartProductRepository: Repository<CartProductEntity>
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartProductService, 
        {
          provide: ProductService,
          useValue: {
            findProductById: jest.fn().mockResolvedValue(productMock)
          }
        },
        {
          provide: getRepositoryToken(CartProductEntity),
          useValue: {
            findOne: '',
            save: '',
            delete: jest.fn().mockResolvedValue(returnDeletedMock),
          }
        }
      ],
    }).compile()

    service = module.get<CartProductService>(CartProductService)
    productService = module.get<ProductService>(ProductService)
    cartProductRepository = module.get<Repository<CartProductEntity>>(getRepositoryToken(CartProductEntity))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(productService).toBeDefined()
    expect(cartProductRepository).toBeDefined()
  })

  it('should return Delete Result after delete product', async() => {
    const deleteResult = await service.deleteProductCart(productMock.id, cartMock.id)
    expect(deleteResult).toEqual(returnDeletedMock)
  })

  it('should return error in exception delete', async() => {
    jest.spyOn(cartProductRepository, 'delete').mockRejectedValue(new Error())

    expect(service.deleteProductCart(productMock.id, cartMock.id),).rejects.toThrow()
  })

})