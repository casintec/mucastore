import { userEntityMock } from '../../user/__mocks__/user.mock';
import { ReturnLoginDto } from '../dto/return-login.dto';
import { authJwtMock } from './auth-jwt.mock';

export const authReturnLoginMock: ReturnLoginDto = {
  accessToken: authJwtMock,
  user: userEntityMock,
};