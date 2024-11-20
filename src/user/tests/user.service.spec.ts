import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from '../user.service'
import { Repository } from 'typeorm'
import { UserEntity } from '../entities/user.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserEntityMock } from '../mocks/user.mock'
import { createUserMock } from '../mocks/create-user.mock'

describe('UserService', () => {
  let service: UserService
  let userRepository: Repository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(UserEntityMock),
            save: jest.fn().mockResolvedValue(UserEntityMock)
          }
        }
        
      ]
    }).compile()

    service = module.get<UserService>(UserService)
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity)
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(userRepository).toBeDefined()
  })

  it('should return in findUserByEmail', async () => {
    const user = await service.findOneUserByEmail(UserEntityMock.email)
    expect(user).toEqual(UserEntityMock)
  })

  it('should return error in findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockReturnValue(undefined)

    expect(
      service.findOneUserByEmail(UserEntityMock.email),
    ).rejects.toThrow()
  })

  it('should return error in findOneUserByEmail (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error())

    expect(
      service.findOneUserByEmail(UserEntityMock.email),
    ).rejects.toThrow()
  })

  it('should return in findUserById', async () => {
    const user = await service.findOneUserById(UserEntityMock.id)
    expect(user).toEqual(UserEntityMock)
  })

  it('should return error in findOneUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockReturnValue(undefined)

    expect(
      service.findOneUserByEmail(UserEntityMock.email),
    ).rejects.toThrow()
  })

  it('should return error in findOneUserById (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error())

    expect(
      service.findOneUserById(UserEntityMock.id),
    ).rejects.toThrow()
  })

  it('should return in findOneUserByIdUsingRelations', async () => {
    const user = await service.findOneUserByIdUsingRelations(UserEntityMock.id)
    expect(user).toEqual(UserEntityMock)
  })

  it('should return error if user exist', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrow();
  });

  it('should return user if user not exist', async () => {
    
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    const user = await service.createUser(createUserMock);
    expect(user).toEqual(UserEntityMock);
  });
}) 