import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../__mocks__/product.mock';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/__mocks__/category.mock';
import { CreateProductDto } from '../dto/create-product.dto';
import { createProductMock } from '../__mocks__/create-product.mock';
import { returnDeletedMock } from '../../__mocks__/return-deleted-items.mock';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>
  let categoryService: CategoryService; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            findCategoryById: jest.fn().mockResolvedValue(categoryMock),
          },
        }, 
        {
        provide: getRepositoryToken(ProductEntity),
        useValue: {
          find: jest.fn().mockResolvedValue([productMock]),
          save: jest.fn().mockResolvedValue(productMock),
          findOne: jest.fn().mockResolvedValue(productMock),
          delete: jest.fn().mockResolvedValue(returnDeletedMock)
        }
      }],
    }).compile();

    service = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService)
    productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should return list of the all products', async () => {
    const products = await service.findAll()
    expect(products).toEqual([productMock]);
  });

  it('should return error if products empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);
    expect(service.findAll()).rejects.toThrow();
  }); 

  it('should return error in exception', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error())
    expect(service.findAll()).rejects.toThrow();
  });

  it('should return product after insert in DB', async () => {
    const product = await service.createProduct(createProductMock);
    expect(product).toEqual(productMock);
  });

  it('should return product after insert in DB', async () => {
    jest.spyOn(categoryService, 'findCategoryById').mockRejectedValue(new Error());
    expect(service.createProduct(createProductMock)).rejects.toThrow();
  }); 

  it('should return product after insert in DB', async () => {
    jest
      .spyOn(categoryService, 'findCategoryById')
      .mockRejectedValue(new Error());

    expect(service.createProduct(createProductMock)).rejects.toThrow();
  });

  it('should return product in find by id', async () => {
    const product = await service.findProductById(productMock.id);
    expect(product).toEqual(productMock);
  });

  it('should return product after insert in DB', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.findProductById(productMock.id)).rejects.toThrow();
  });

  it('should return delete true in delete product', async () => {
    const deleted = await service.deleteProduct(productMock.id);
    expect(deleted).toEqual(returnDeletedMock); 
  });

  it('should return product after update', async () => {
    const product = await service.updateProduct(
      productMock.id,
      createProductMock
    );
    expect(product).toEqual(productMock); 
  });

  it('should return error in update product', async () => {
    jest.spyOn(productRepository, 'save').mockRejectedValue(new Error());
    expect(service.updateProduct(productMock.id,createProductMock),
    ).rejects.toThrow();
  });

});
