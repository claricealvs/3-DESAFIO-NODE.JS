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

  async getAllUsers() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error retrieving user: ${error.message}`);
      } else {
        throw new Error(`Unknown error retrieving user`);
      }
    }
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      return user ? user : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error retrieving user with ID ${id}: ${error.message}`,
        );
      } else {
        throw new Error('Unknown error retrieving user');
      }
    }
  }

  async createUser(
    name: string,
    cpf: string,
    birth: string,
    cep: string,
    email: string,
    password: string,
  ): Promise<User> {
    if (
      ![name, cpf, cep, email, password].every(
        (value) => typeof value === 'string',
      )
    ) {
      throw new Error('Incompatible data value.');
    }

    const [day, month, year] = birth.split('/');
    const formattedBirth = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
    );

    // Verificar se a data é válida
    if (isNaN(formattedBirth.getTime())) {
      throw new Error('Invalid birth date format');
    }

    const newUser = this.userRepository.create({
      name,
      cpf,
      birth: formattedBirth,
      cep,
      email,
      password,
    });

    await this.userRepository.save(newUser);

    return newUser;
  }

  formatDateToBrazilian(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
