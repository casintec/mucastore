import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './order.service';
import { ReturnOrderDto } from './dto/return-order.dto';
import { Response } from 'express';
import { RoleUser } from 'src/user/enum/role.enum';

@Roles(RoleUser.Admin, RoleUser.Root, RoleUser.User)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @UserId() userId: number,
  ): Promise<OrderEntity> {
    return this.orderService.createOrder(createOrderDto, userId);
  }

  @Get()
  async findOrdersByUserId(
    @UserId() userId: number,
    @Res({ passthrough: true }) res?: Response,
  ): Promise<OrderEntity[]> {
    const orders = await this.orderService
      .findOrdersByUserId(userId)
      .catch(() => undefined);

    if (orders) {
      return orders;
    }

    res.status(204).send();
    return;
  }

  @Roles(RoleUser.Admin, RoleUser.Root)
  @Get('/all')
  async findAllOrders(): Promise<ReturnOrderDto[]> {
    return (await this.orderService.findAllOrders()).map(
      (order) => new ReturnOrderDto(order),
    );
  }

  @Roles(RoleUser.Admin, RoleUser.Root)
  @Get('/:orderId')
  async findOrderById(
    @Param('orderId') orderId: number,
  ): Promise<ReturnOrderDto> {
    return new ReturnOrderDto(
      (await this.orderService.findOrdersByUserId(undefined, orderId))[0],
    );
  }
}