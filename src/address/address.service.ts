import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAddressByUserId(userId: number): Promise<AddressEntity[]> {
    const addresses = await this.addressRepository.find({
      where: {
        userId,
      },
      relations: {
        city: {
          state: true
        }
      }
    })
    if(!addresses){
      throw new NotFoundException(`Address not found for userId: ${userId}`)
    }
    return addresses
  }
}
