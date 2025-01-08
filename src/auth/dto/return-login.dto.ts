import { ReturnUserCreateUserDTO } from '../../user/dto/return-user-create-user.dto';

export interface ReturnLoginDto {
  user: ReturnUserCreateUserDTO;
  accessToken: string;
}