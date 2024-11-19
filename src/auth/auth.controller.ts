import { Body, Controller, UsePipes, ValidationPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ReturnUserCreateUserDTO } from 'src/user/dto/return-user-create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() loginDTO: LoginDTO): Promise<ReturnUserCreateUserDTO> {
    
    return new ReturnUserCreateUserDTO(await this.authService.login(loginDTO))
    
  }
}
