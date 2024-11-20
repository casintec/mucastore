import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dto/create-address.dto';
import { UpdateAddressDTO } from './dto/update-address.dto';
import { AddressEntity } from './entities/address.entity';
import { RoleUser } from '../user/enum/role.enum';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';


@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Roles(RoleUser.User)
  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() CreateAddressDTO: CreateAddressDTO, 
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(CreateAddressDTO, userId);
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateAddressDTO: UpdateAddressDTO) {
    return this.addressService.update(+id, UpdateAddressDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
