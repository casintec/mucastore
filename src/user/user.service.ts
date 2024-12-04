import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleUser } from './enum/role.enum';
import { UpdatePasswordDTO } from './dto/update-user-password.dto';
import { createPasswordHashed, validatePassword } from '../utils/password';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ){}

  async createUser(
    createUserDTO: CreateUserDTO
  ): Promise<UserEntity> {
    const user = await this.findOneUserByEmail(createUserDTO.email).catch(
      () => undefined
    )

    if(user){
      throw new BadRequestException('Email already exists in the system')
    }

    const passwordhashed = await createPasswordHashed(
      createUserDTO.password
    );
    
    return this.userRepository.save({
      ...createUserDTO,
      RoleUser: RoleUser ? RoleUser : RoleUser.User,
      password: passwordhashed
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

  async updatePasswordUser(
    updatePasswordDTO: UpdatePasswordDTO, 
    userId: number,
  ): Promise<UserEntity> {
    const user = await this.findOneUserById(userId)

    const passwordHashed = await createPasswordHashed(
      updatePasswordDTO.newPassword,
    );

    const isMatch = await validatePassword(
      updatePasswordDTO.lastPassword, 
      user.password || '',
    )

    if(!isMatch) {
      throw new BadRequestException('Last Password Invalid');
    } 

    return this.userRepository.save({
      ...user,
      password: passwordHashed,
    })
  }
} 
