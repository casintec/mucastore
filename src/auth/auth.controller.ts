import { Body, Controller, UsePipes, ValidationPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ReturnLoginDTO } from './dto/return-login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() loginDTO: LoginDTO): Promise<ReturnLoginDTO> {
    return await this.authService.login(loginDTO)
  }
}
