import { Repository } from 'typeorm';
import connect from '../../database/connection';
import bcrypt from 'bcryptjs';
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
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email already in use');
    }

    if (
      ![name, cpf, cep, email, password].every(
        (value) => typeof value === 'string',
      )
    ) {
      throw new Error('Incompatible data value.');
    }

    if (!validateCPF(cpf)) {
      throw new Error('Invalid CPF');
    }

    if (!validateEmail(email)) {
      throw new Error('Invalid email format');
    }

    if (!validatePassword(password)) {
      throw new Error('Password must be at least 6 characters long');
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      name,
      cpf,
      birth: formattedBirth,
      cep,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    return newUser;
  }

  async updateUser(
    id: number,
    name: string,
    cpf: string,
    birth: string,
    cep: string,
    email: string,
    password: string,
  ) {
    const existingUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!existingUser) {
      throw new Error('The inserted user does not exist.');
    }
    if (
      ![name, cpf, cep, email, password].every(
        (value) => typeof value === 'string',
      )
    ) {
      throw new Error('Incompatible data value.');
    }

    if (!validateCPF(cpf)) {
      throw new Error('Invalid CPF');
    }

    if (!validateEmail(email)) {
      throw new Error('Invalid email format');
    }

    if (!validatePassword(password)) {
      throw new Error('Password must be at least 6 characters long');
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

    await this.userRepository.update(id, {
      name,
      cpf,
      birth: formattedBirth,
      cep,
      email,
      password,
    });

    const updatedUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!updatedUser) {
      throw new Error('Error when searching for updated user.');
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const existingUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!existingUser) {
      throw new Error('The inserted user does not exist.');
    }

    await this.userRepository.delete(id);
  }
}

function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password: string): boolean {
  return password.length >= 6;
}

export default new UserService();
