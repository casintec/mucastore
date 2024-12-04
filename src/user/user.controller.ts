import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { ReturnUserCreateUserDTO } from './dto/return-user-create-user.dto';
import { UpdatePasswordDTO } from './dto/update-user-password.dto';
import { UserId } from '../decorators/user-id.decorator';
import { Roles } from '../decorators/roles.decorator';
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

  @Roles(RoleUser.Admin)
  @Get()
  async findAll(): Promise<ReturnUserCreateUserDTO[]> {
    return (await this.userService.findAll()).map(
      (UserEntity) => new ReturnUserCreateUserDTO(UserEntity)
    );
  }

  @Roles(RoleUser.Admin)
  @Get('/:userId')
  async findOneUserById(
    @Param('userId') userId: number
  ): Promise<ReturnUserCreateUserDTO> {
    return new ReturnUserCreateUserDTO(
      await this.userService.findOneUserByIdUsingRelations(userId),
    ) 
  }

  @Roles(RoleUser.Admin, RoleUser.User)
  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(
    @Body() updatePasswordDTO: UpdatePasswordDTO,
    @UserId() userId: number,
  ): Promise<UserEntity>{
    return this.userService.updatePasswordUser(updatePasswordDTO, userId)
  }

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneUserById(+id);
  }*/
}
