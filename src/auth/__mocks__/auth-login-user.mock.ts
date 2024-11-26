import { userEntityMock } from '../../user/__mocks__/user.mock';
import { LoginDTO } from '../dto/login.dto';

export const loginUserMock: LoginDTO = {
  email: userEntityMock.email,
  password: 'abc',
};