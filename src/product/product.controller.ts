import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RoleUser } from 'src/user/enum/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ReturnProductDto } from './dto/return-product.dto';
import { ProductEntity } from './entities/product.entity';

@Roles(RoleUser.Admin, RoleUser.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(RoleUser.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  async findAll(): Promise<ReturnProductDto[]> {
    return (await this.productService.findAll()).map((product) => new ReturnProductDto(product))
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Roles(RoleUser.Admin)
  @UsePipes(ValidationPipe)
  @Put(':productId')
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('productId') productId: number,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(productId, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.deleteProduct(+id);
  }
}
