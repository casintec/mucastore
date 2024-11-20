import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ){}

  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const user = await this.findOneUserByEmail(createUserDTO.email).catch(() => undefined)

    if(user){
      throw new BadRequestException('Email already exists in the system')
    }

    const saltOrRounds = 10;
    const passwordhasher = await hash(createUserDTO.password, saltOrRounds);
    
    return this.userRepository.save({
      ...createUserDTO,
      typeUser: 1,
      password: passwordhasher
    })
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOneUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    })

    if(!user){
      throw new NotFoundException(`UserId: ${userId} Not Found`)
    }
    return user;
  }

  async findOneUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email
      }
    })

    if(!user){
      throw new NotFoundException(`Email: ${email} Not Found`)
    }
    return user;
  }

  async findOneUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: userId
      },
      relations: {
        addresses: {
          city: {
            state: true
          }
        }
      }
    })
  }
}
