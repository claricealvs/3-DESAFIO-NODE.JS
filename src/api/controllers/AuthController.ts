import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getRepository } from 'typeorm';
import { User } from '../../database/entities/User';

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      console.log(email);

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Gerar o token JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRES_IN || '12h' },
      );

      // Retornar o token
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
