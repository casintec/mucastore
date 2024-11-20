import { Test, TestingModule } from '@nestjs/testing';
import { userEntityMock } from '../__mocks__/user.mock';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { createUserMock } from '../__mocks__/create-user.mock';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(userEntityMock),
            updatePasswordUser: jest.fn().mockResolvedValue(userEntityMock),
            getUserByIdUsingRelations: jest
              .fn()
              .mockResolvedValue(userEntityMock),
            getAllUser: jest.fn().mockResolvedValue([userEntityMock]),
          },
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user Entity in createUser', async () => {
    const user = await controller.createUser(createUserMock);
    expect(user).toEqual(userEntityMock);
  });

});