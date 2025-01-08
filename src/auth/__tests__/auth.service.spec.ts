import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ReturnUserCreateUserDTO } from '../../user/dto/return-user-create-user.dto';
import { UserService } from '../../user/user.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { AuthService } from '../auth.service';
import { authJwtMock } from '../__mocks__/auth-jwt.mock';
import { authLoginUserMock } from '../__mocks__/auth-login-user.mock';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => authJwtMock,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user if password invalid and email valid', async () => {
    expect(
      service.login({ ...authLoginUserMock, password: '4324' }),
    ).rejects.toThrow();
  });
});