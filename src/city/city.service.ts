import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    return this.cacheService.getCache<CityEntity[]>(`state_entity_${stateId}`, () => 
      this.cityRepository.find({
      where: {
        stateId,
      }
    }))
  }

  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  findAll() {
    return `This action returns all city`;
  }

  async findOneCityById(cityId: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: {
        id: cityId
      }
    })

    if(!city){
      throw new NotFoundException(`CityId: ${cityId} not found`)
    }
    return city;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
