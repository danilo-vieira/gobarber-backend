import { uuid } from 'uuidv4';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../../dtos/IFindAllProvidersDTO';
import IUsersRepository from '../IUsersRepository';

import User from '../../infra/typeorm/entities/User';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findedUser = this.users.find(user => user.id === id);

    return findedUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findedUser = this.users.find(user => user.email === email);

    return findedUser;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id);
    }

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}
