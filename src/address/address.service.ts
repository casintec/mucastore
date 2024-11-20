import { Injectable } from '@nestjs/common';
import { CreateAddressDTO } from './dto/create-address.dto';
import { UpdateAddressDTO } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ){}

  async createAddress(
    createAddressDTO: CreateAddressDTO, 
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.findOneUserById(userId)
    await this.cityService.findOneCityById(createAddressDTO.cityId)
    return this.addressRepository.save({
      ...createAddressDTO,
      userId
    });
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, UpdateAddressDTO: UpdateAddressDTO) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
