import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address.entity';
import { RoleUser } from '../user/enum/role.enum';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { ReturnAddressDto } from './dto/return-address.dto';

@Roles(RoleUser.User, RoleUser.Admin)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() CreateAddressDto: CreateAddressDto, 
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(CreateAddressDto, userId);
  }

  @Get()
  async findAddressByUserId( 
    @UserId() userId: number,
  ): Promise<ReturnAddressDto[]> {
    return (await this.addressService.findAddressByUserId(userId)).map((address) => new ReturnAddressDto(address));
  }
}
