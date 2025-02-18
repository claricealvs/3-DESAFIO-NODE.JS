import { Request, Response } from 'express';
import { UserService } from '../services/UserServices';
import axios from 'axios';
import { format } from 'date-fns';

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

      const { data: address } = await axios.get(
        `https://viacep.com.br/ws/${user.cep}/json`,
      );

      if (address.erro) {
        throw new Error('Invalid CEP');
      }

      // Montar o objeto com os dados do endereço
      const userWithAddress = {
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        birth: user.birth,
        email: user.email,
        cep: user.cep,
        street: address.logradouro,
        neighborhood: address.bairro,
        city: address.localidade,
        uf: address.uf,
        complement: address.complemento || '',
      };

      return res.status(200).json(userWithAddress);
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

      const newUser = await this.userService.createUser(
        name,
        cpf,
        birth,
        cep,
        email,
        password,
      );

      const { data: address } = await axios.get(
        `https://viacep.com.br/ws/${cep}/json`,
      );

      if (address.erro) {
        throw new Error('Invalid CEP');
      }

      const formattedUser = {
        id: newUser.id,
        name: newUser.name,
        cpf: newUser.cpf,
        birth: format(newUser.birth, 'dd/MM/yyyy'),
        email: newUser.email,
        cep: newUser.cep,
        street: address.logradouro,
        neighborhood: address.bairro,
        city: address.localidade,
        uf: address.uf,
        complement: address.complemento || '',
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
        birth: format(updatedUser.birth, 'dd/MM/yyyy'),
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
