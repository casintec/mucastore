import { Injectable, NotFoundException } from '@nestjs/common';
import { InsertCartDto } from './dto/insert-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartProductService } from '../cart-product/cart-product.service';

@Injectable()
export class CartService {
  constructor (
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartProductService: CartProductService
  ){}

  async findCartUserId(userId: number, isRelations?: boolean): Promise<CartEntity> {
    const relations = isRelations ? {
      cartProduct: {
        product: true
      }
    } : undefined

    const cart = await this.cartRepository.findOne({
      where: {
        userId,
        active: true,
      },
      relations,
    })

    if(!cart){
      throw new NotFoundException(`Cart active not found`)
    }

    return cart
  }

  async createCart(userId: number): Promise<CartEntity> {
    return this.cartRepository.save({
      active: true,
      userId
    })
  }

  async insertProductInCart(insertCartDto: InsertCartDto, userId: number): Promise<CartEntity> {
    const cart = await this.findCartUserId(userId).catch( async () => {
      return this.createCart(userId)
    })

    await this.cartProductService.insertProductInCart(insertCartDto, cart)

    return this.findCartUserId(userId, true)
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
