import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDTO } from '../auth/dto/login-payload.dto'
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RoleUser } from '../user/enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector, 
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<RoleUser[]>(
      ROLES_KEY, 
      [context.getHandler(), context.getClass(),]
    ) 
  
    if (!requiredRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers
    const authNoBearer = authorization.replace('Bearer ', '')

    const loginPayloadDTO: LoginPayloadDTO | undefined = 
      await this.jwtService
        .verifyAsync(authNoBearer, {
          secret: process.env.JWT_SECRET
        })
      .catch(() => undefined)
      
      if(!loginPayloadDTO){
        return false
      }

    return requiredRoles.some((role) => role === loginPayloadDTO.typeUser);
  }
}