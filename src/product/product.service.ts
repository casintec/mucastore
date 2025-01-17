import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, In, Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) 
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService
  ){}

  async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
    await this.categoryService.findCategoryById(createProductDto.categoryId);
    return this.productRepository.save({
      ...createProductDto,
    })
  }

  async findProductById(productId: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      }
    })

    if(!product) {
      throw new NotFoundException(`Product Id: ${productId} not found`)
    }
    
    return product
  }

  async findAll(
    productId?: number[],
    isFindRelations?: boolean,
  ): Promise<ProductEntity[]> {
    let findOptions = {};

    if (productId && productId.length > 0) {
      findOptions = {
        where: {
          id: In(productId),
        },
      };
    }

    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        relations: {
          category: true,
        },
      };
    }

    const products = await this.productRepository.find(findOptions);

    if (!products || products.length === 0) {
      throw new NotFoundException('Not found products');
    }

    return products;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async updateProduct(
    productId: number, 
    updateProductDto: UpdateProductDto
  ): Promise<ProductEntity> {
    const product = await this.findProductById(productId)
    
    return this.productRepository.save({
      ...product,
      ...updateProductDto
    });
  }

  async deleteProduct(productId: number): Promise<DeleteResult> {
    const product = await this.findProductById(productId)
    return this.productRepository.delete({ id: product.id }); 
  }
} 
