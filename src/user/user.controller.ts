import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ReturnUserCreateUserDTO } from './dto/return-user-create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto)
  }

  @Get()
  async findAll(): Promise<ReturnUserCreateUserDTO[]> {
    return (await this.userService.findAll()).map(
      (UserEntity) => new ReturnUserCreateUserDTO(UserEntity)
    );
  }

  @Get('/:userId')
  async findOneUserById(@Param('userId') userId: number): Promise<ReturnUserCreateUserDTO> {
    return new ReturnUserCreateUserDTO(
      await this.userService.findOneUserByIdUsingRelations(userId),
    ) 
  }

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneUserById(+id);
  }*/
}
