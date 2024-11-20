import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ReturnUserCreateUserDTO } from './dto/return-user-create-user.dto';
import { RoleUser } from './enum/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //@Roles(UserType.Root)
  /*@Post('/admin')
  async createAdmin(@Body() createUserDTO: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUserDTO, RoleUser.Admin);
  }*/

  @UsePipes(ValidationPipe) 
  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO)
  }

  @Get()
  async findAll(): Promise<ReturnUserCreateUserDTO[]> {
    return (await this.userService.findAll()).map(
      (UserEntity) => new ReturnUserCreateUserDTO(UserEntity)
    );
  }

  @Get('/:userId')
  async findOneUserById(
    @Param('userId') userId: number
  ): Promise<ReturnUserCreateUserDTO> {
    return new ReturnUserCreateUserDTO(
      await this.userService.findOneUserByIdUsingRelations(userId),
    ) 
  }

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneUserById(+id);
  }*/
}
