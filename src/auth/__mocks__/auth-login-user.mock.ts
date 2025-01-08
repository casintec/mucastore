import { userEntityMock } from '../../user/__mocks__/user.mock';
import { LoginDto } from '../dto/login.dto';

export const authLoginUserMock: LoginDto = {
  email: userEntityMock.email,
  password: 'abc',
};