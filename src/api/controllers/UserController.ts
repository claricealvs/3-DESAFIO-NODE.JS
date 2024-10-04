import { Request, Response } from 'express';
import { UserService } from '../services/UserServices';

export class UserController {
  private userService = new UserService();

  async getAllusers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();

      const formattedUsers = users.map((user) => ({
        user: [
          {
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            birth: user.birth,
            cep: user.cep,
            email: user.email,
            password: user.password,
          },
        ],
      }));

      res.json(formattedUsers);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({
          code: 400,
          status: 'Bad Request',
          message: error.message,
        });
      } else {
        return res.status(500).json({
          code: 500,
          status: 'Internal Server Error',
          message: 'An unexpected error has occurred.',
        });
      }
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    try {
      const user = await this.userService.getUserById(parseInt(id, 10));

      if (!user) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'User not found',
        });
      }

      return res.status(200).json({
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        birth: user.birth,
        cep: user.cep,
        email: user.email,
        password: user.password,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res
          .status(500)
          .json({ error: 'An unexpected error has occurred.' });
      }
    }
  }

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

  async updateUser(req: Request, res: Response) {
    try {
      const { name, cpf, birth, cep, email, password } = req.body;

      const id = req.params.id;

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

      const updatedUser = await this.userService.updateUser(
        parseInt(id, 10),
        name,
        cpf,
        birth,
        cep,
        email,
        password,
      );

      const formattedUser = {
        id: updatedUser.id,
        name: updatedUser.name,
        cpf: updatedUser.cpf,
        birth: updatedUser.birth,
        cep: updatedUser.cep,
        email: updatedUser.email,
        password: updatedUser.password,
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

  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id;

      await this.userService.deleteUser(id);

      return res.status(204).json();
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
