import { Request, Response } from 'express';
import { CarService } from '../services/CarServices';

export class CarController {
  private carService = new CarService();

  async createCar(req: Request, res: Response) {
    try {
      const {
        model,
        color,
        year,
        valuePerDay,
        acessories,
        numberOfPassengers,
      } = req.body;

      const newCar = await this.carService.createCar(
        model,
        color,
        year,
        valuePerDay,
        acessories,
        numberOfPassengers,
      );

      const formattedCar = {
        id: newCar.id,
        model: newCar.model,
        color: newCar.color,
        year: newCar.year,
        valuePerDay: newCar.valuePerDay,
        acessories: newCar.acessories,
        numberOfPassengers: newCar.numberOfPassengers,
      };

      return res.status(201).json(formattedCar);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Ocorreu um erro inesperado.' });
      }
    }
  }
}
