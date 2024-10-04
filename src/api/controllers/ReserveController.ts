import { Request, Response } from 'express';
import { ReserveService } from '../services/ReserveServices';
import { format } from 'date-fns';

export class ReserveController {
  private reserveService = new ReserveService();

  async createReserve(req: Request, res: Response) {
    try {
      const { car_id, startDate, endDate } = req.body;

      /*if (!car_id || !startDate || !endDate) {
        return res.status(400).json({
          code: 400,
          status: 'Bad Request',
          message: 'All fields are required.',
        });
      }*/

      const newReserve = await this.reserveService.createReserve(
        car_id,
        startDate,
        endDate,
      );

      const formattedReserve = {
        id: newReserve.id,
        startDate: format(newReserve.startDate, 'dd/MM/yyyy'),
        endDate: format(newReserve.endDate, 'dd/MM/yyyy'),
        car_id: newReserve.car.id,
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
  }
}
