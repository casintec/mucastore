import { UserEntity } from "../entities/user.entity";
import { RoleUser } from '../enum/role.enum'

export const userEntityMock: UserEntity = {
  cpf: '987654321',
  email: 'emailmock@email.com',
  id: 456123,
  name: 'nameMock', 
  password: '123',
  phone: '987654321',
  typeUser: RoleUser.User,
  create_at: new Date(),
  update_at: new Date()
}