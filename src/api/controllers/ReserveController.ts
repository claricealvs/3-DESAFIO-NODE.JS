import { Request, Response } from 'express';
import { ReserveService } from '../services/ReserveServices';
import { format } from 'date-fns';

export class ReserveController {
  private reserveService = new ReserveService();

  getAllReserves = async (req: Request, res: Response) => {
    try {
      const reserves = await this.reserveService.getAllReserves();

      const formattedReserves = reserves.map((reserve) => ({
        reserve: [
          {
            id: reserve.id,
            startDate: format(reserve.startDate, 'dd/MM/yyyy'),
            endDate: format(reserve.endDate, 'dd/MM/yyyy'),
            finalValue: reserve.finalValue,
            carId: reserve.car.id,
            userId: reserve.user.id,
          },
        ],
      }));

      res.json(formattedReserves);
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
  };

  getReserveById = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;

    try {
      const reserve = await this.reserveService.getReserveById(
        parseInt(id, 10),
      );

      if (!reserve) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'Reserve not found',
        });
      }

      return res.status(200).json({
        id: reserve.id,
        startDate: format(reserve.startDate, 'dd/MM/yyyy'),
        endDate: format(reserve.endDate, 'dd/MM/yyyy'),
        finalValue: reserve.finalValue,
        carId: reserve.car.id,
        userId: reserve.user.id,
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
  };

  createReserve = async (req: Request, res: Response) => {
    try {
      const { carId, userId, startDate, endDate } = req.body;

      const newReserve = await this.reserveService.createReserve(
        carId,
        userId,
        startDate,
        endDate,
      );

      const formattedReserve = {
        id: newReserve.id,
        startDate: format(newReserve.startDate, 'dd/MM/yyyy'),
        endDate: format(newReserve.endDate, 'dd/MM/yyyy'),
        finalValue: newReserve.finalValue,
        carId: newReserve.car.id,
        userId: newReserve.user.id,
      };

      return res.status(201).json(formattedReserve);
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
  };

  updateReserve = async (req: Request, res: Response) => {
    try {
      const { carId, userId, startDate, endDate } = req.body;
      const id = req.params.id;

      const updatedReserve = await this.reserveService.updateReserve(
        parseInt(id, 10),
        carId,
        userId,
        startDate,
        endDate,
      );

      const formattedReserve = {
        id: updatedReserve.id,
        startDate: format(updatedReserve.startDate, 'dd/MM/yyyy'),
        endDate: format(updatedReserve.endDate, 'dd/MM/yyyy'),
        carId: updatedReserve.car.id,
        userId: updatedReserve.user.id,
      };

      return res.status(201).json(formattedReserve);
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
  };

  deleteReserve = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      await this.reserveService.deleteReserve(id);

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
  };
}
