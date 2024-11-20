import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ReturnUserCreateUserDTO } from '../user/dto/return-user-create-user.dto'
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dto/login.dto';
import { LoginPayloadDTO } from './dto/login-payload.dto';
import { ReturnLoginDTO } from './dto/return-login.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ){}

  async login(loginDTO: LoginDTO): Promise<ReturnLoginDTO> {

    const user: UserEntity | undefined = await this.userService
    .findOneUserByEmail(loginDTO.email)
    .catch(() => undefined)
    
    const isMatch = await compare(loginDTO.password, user?.password || '')
    
    if(!user || !isMatch){
      throw new NotFoundException('Email or Password invalid')
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayloadDTO(user) }),
      user: new ReturnUserCreateUserDTO(user)
    } 
  }
}
