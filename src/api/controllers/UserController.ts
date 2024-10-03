import { Request, Response } from 'express';
import { UserService } from '../services/UserServices';

export class UserController {
  private userService = new UserService();

  async createUser(req: Request, res: Response) {
    try {
      const { name, cpf, birth, cep, email, password } = req.body;

      if (!name || !cpf || !birth || !cep || !email || !password) {
        return res.status(400).json({
          code: 400,
          status: 'Bad Request',
          message: 'All fields are required.',
        });
      }

      const birthParts = birth.split('/');
      if (
        birthParts.length !== 3 ||
        isNaN(Date.parse(`${birthParts[0]}-${birthParts[1]}-${birthParts[2]}`))
      ) {
        return res.status(400).json({ error: 'Invalid birth date format.' });
      }

      const newUser = await this.userService.createUser(
        name,
        cpf,
        birth,
        cep,
        email,
        password,
      );

      const formattedBirth = this.userService.formatDateToBrazilian(
        newUser.birth,
      );

      const formattedUser = {
        id: newUser.id,
        name: newUser.name,
        cpf: newUser.cpf,
        birth: formattedBirth,
        cep: newUser.cep,
        email: newUser.email,
        password: newUser.password,
      };

      return res.status(201).json(formattedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const code = (error as any).status || 400;

        let statusMessage = '';

        if (code == 400) {
          statusMessage = 'Bad Request';
        }

        if (code == 404) {
          statusMessage = 'Not Found';
        }

        return res.status(code).json({
          code: code,
          status: statusMessage,
          message: error.message,
        });
      } else {
        return res
          .status(500)
          .json({ error: 'An unexpected error has occurred.' });
      }
    }
  }
}
