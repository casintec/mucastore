import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { InsertCartDto } from './dto/insert-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Roles } from '../decorators/roles.decorator';
import { RoleUser } from '../user/enum/role.enum';
import { CartEntity } from './entities/cart.entity';
import { UserId } from 'src/decorators/user-id.decorator';

@Roles(RoleUser.User, RoleUser.Admin, RoleUser.Root)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async insertCart(@Body() insertCartDto: InsertCartDto, @UserId() userId: number): Promise<CartEntity> {
    return this.cartService.insertProductInCart(insertCartDto, userId);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
