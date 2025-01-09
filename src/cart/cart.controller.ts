import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { InsertCartDto } from './dto/insert-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Roles } from '../decorators/roles.decorator';
import { RoleUser } from '../user/enum/role.enum';
import { CartEntity } from './entities/cart.entity';
import { UserId } from '../decorators/user-id.decorator';
import { ReturnCartProductDto } from '../cart-product/dto/return-cart-product.dto';
import { ReturnCartDto } from './dto/return-cart.dto';
import { DeleteResult } from 'typeorm';

@Roles(RoleUser.User, RoleUser.Admin, RoleUser.Root)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async insertCart(
    @Body() insertCartDto: InsertCartDto, 
    @UserId() userId: number
  ): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.insertProductInCart(insertCartDto, userId)
    );
  }

  @Get()
  async findCartUserId(
    @UserId() userId: number
  ): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.findCartByUserId(userId, true)
    );
  }

  @Delete()
  async clearCart(@UserId() userId: number): Promise<DeleteResult> {
    return this.cartService.clearCart(userId);
  }

  @Delete('/product/:productId')
  async deleteProductCart(
    @Param('productId') productId: number, 
    @UserId() userId: number
  ): Promise<DeleteResult> {
    return this.cartService.deleteProductCart(productId, userId)
  }

  @UsePipes(ValidationPipe)
  @Patch()
  async updateProductInCart(
    @Body() updateCartDto: UpdateCartDto, 
    @UserId() userId: number
  ): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.updateProductInCart(updateCartDto, userId)
    )
  }

}
