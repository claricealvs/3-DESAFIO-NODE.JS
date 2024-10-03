import { Request, Response } from 'express';
import { CarService } from '../services/CarServices';
import { AcessoryEnum } from '../../database/enums/AcessoryEnum';

export class CarController {
  private carService = new CarService();

  async getAllCars(req: Request, res: Response) {
    try {
      const cars = await this.carService.getAllCars();

      const formattedCars = cars.map((car) => ({
        car: [
          {
            id: car.id,
            model: car.model,
            color: car.color,
            year: car.year,
            valuePerDay: car.valuePerDay,
            acessories: car.acessories,
            numberOfPassengers: car.numberOfPassengers,
          },
        ],
      }));

      res.json(formattedCars);
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

  async getCarById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    try {
      const car = await this.carService.getCarById(parseInt(id, 10));

      if (!car) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'Car not found',
        });
      }

      return res.status(200).json({
        id: car.id,
        model: car.model,
        color: car.color,
        year: car.year,
        valuePerDay: car.valuePerDay,
        acessories: car.acessories,
        numberOfPassengers: car.numberOfPassengers,
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

      const validAcessories = acessories.map((acessory: string) => {
        if (!Object.values(AcessoryEnum).includes(acessory as AcessoryEnum)) {
          throw new Error(`Invalid acessory: ${acessory}`);
        }
        return acessory as AcessoryEnum;
      });

      const newCar = await this.carService.createCar(
        model,
        color,
        year,
        valuePerDay,
        validAcessories,
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

  async updateCar(req: Request, res: Response) {
    try {
      const {
        model,
        color,
        year,
        valuePerDay,
        acessories,
        numberOfPassengers,
      } = req.body;

      const id = req.params.id;

      const validAcessories = acessories.map((acessory: string) => {
        if (!Object.values(AcessoryEnum).includes(acessory as AcessoryEnum)) {
          throw new Error(`Invalid acessory: ${acessory}`);
        }
        return acessory as AcessoryEnum;
      });

      const updatedCar = await this.carService.updateCar(
        parseInt(id, 10),
        model,
        color,
        year,
        valuePerDay,
        validAcessories,
        numberOfPassengers,
      );

      return res.status(201).json(updatedCar);
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

  async deleteCar(req: Request, res: Response) {
    try {
      const id = req.params.id;

      await this.carService.deleteCar(id);

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
