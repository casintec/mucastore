import { userEntityMock } from '../../user/__mocks__/user.mock';
import { LoginDTO } from '../dto/login.dto';

export const authLoginUserMock: LoginDTO = {
  email: userEntityMock.email,
  password: 'abc',
};