import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { authLoginUserMock } from '../__mocks__/auth-login-user.mock';
import { authReturnLoginMock } from '../__mocks__/auth-return-jwt.mock';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(authReturnLoginMock),
          },
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
  }); 

  it('should return userLogin', async () => {
    const userLogin = await controller.login(authLoginUserMock);
    expect(userLogin).toEqual(authReturnLoginMock);
  });
})