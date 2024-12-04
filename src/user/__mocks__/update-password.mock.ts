import { UpdatePasswordDTO } from '../dto/update-user-password.dto';


export const updatePasswordMock: UpdatePasswordDTO = {
  lastPassword: '123',
  newPassword: 'fdsafj',
};

export const updatePasswordInvalidMock: UpdatePasswordDTO = {
  lastPassword: '123',
  newPassword: 'flkjbla',
};