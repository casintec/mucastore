import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CityService } from '../../city/city.service';
import { cityMock } from '../../city/__mocks__/city.mock';
import { UserService } from '../../user/user.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { Repository } from 'typeorm';
import { AddressService } from '../address.service';
import { AddressEntity } from '../entities/address.entity';
import { addressMock } from '../__mocks__/address.mock';
import { createAddressMock } from '../__mocks__/create-address.mock';

describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: Repository<AddressEntity>;
  let userService: UserService;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            findOneUserById: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            findOneCityById: jest.fn().mockResolvedValue(cityMock),
          },
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock),
            find: jest.fn().mockResolvedValue([addressMock]),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  it('should return address after save', async () => {
    const address = await service.createAddress(
      createAddressMock,
      userEntityMock.id,
    );
    expect(address).toEqual(addressMock);
  });

  it('should return error if exception in userService', async () => {
    jest.spyOn(userService, 'findOneUserById').mockRejectedValueOnce(new Error());
    expect(
      service.createAddress(createAddressMock, userEntityMock.id),
    ).rejects.toThrow();
  });

  it('should return error if exception in cityService', async () => {
    jest.spyOn(cityService, 'findOneCityById').mockRejectedValueOnce(new Error());
    expect(
      service.createAddress(createAddressMock, userEntityMock.id),
    ).rejects.toThrow(); 
  });

  it('should be return all Addresses to user', async () => {
    const addresses = await service.findAddressByUserId(userEntityMock.id)
    expect(addresses).toEqual([addressMock])
  })

  it('should return not found if not Addresses registered', async () => {
    jest.spyOn(addressRepository, 'find').mockResolvedValue(undefined)
    expect(service.findAddressByUserId(userEntityMock.id)).rejects.toThrow()
  })
});