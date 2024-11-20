import { UpdatePasswordDTO } from '../dto/update-user-password.dto';


export const updatePasswordMock: UpdatePasswordDTO = {
  lastPassword: 'abc',
  newPassword: 'fdsafj',
};

export const updatePasswordInvalidMock: UpdatePasswordDTO = {
  lastPassword: 'lkfdjsa',
  newPassword: 'flkjbla',
};