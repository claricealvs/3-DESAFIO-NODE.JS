import { Repository } from 'typeorm';
import connect from '../../database/connection';
import { User } from '../../database/entities/User';

export class UserService {
  private userRepository!: Repository<User>;

  constructor() {
    this.initializeRepository();
  }

  private async initializeRepository() {
    const connection = await connect();
    this.userRepository = connection.getRepository(User);
  }
}
