import { ReturnUserCreateUserDto } from '../../user/dto/return-user-create-user.dto';

export interface ReturnLoginDto {
  user: ReturnUserCreateUserDto;
  accessToken: string;
}