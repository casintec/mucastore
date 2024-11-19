import { ReturnUserCreateUserDTO } from '../../user/dto/return-user-create-user.dto';

export interface ReturnLoginDTO {
  user: ReturnUserCreateUserDTO;
  accessToken: string;
}