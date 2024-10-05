import { Repository } from 'typeorm';
import connect from '../../database/connection';
import { Reserve } from '../../database/entities/Reserve';
import { Car } from '../../database/entities/Car';

export class ReserveService {
  private reserveRepository!: Repository<Reserve>;
  private carRepository!: Repository<Car>;

  constructor() {
    this.initializeRepository();
  }

  private async initializeRepository() {
    const connection = await connect();
    this.reserveRepository = connection.getRepository(Reserve);
    this.carRepository = connection.getRepository(Car);
  }

  async createReserve(
    carId: number,
    startDate: string,
    endDate: string,
  ): Promise<Reserve> {
    if (![startDate, endDate].every((value) => typeof value === 'string')) {
      throw new Error('Incompatible data value.');
    }

    const [startDay, startMonth, startYear] = startDate.split('/');
    const formattedStartDate = new Date(
      Number(startYear),
      Number(startMonth) - 1,
      Number(startDay),
    );

    const [endDay, endMonth, endYear] = endDate.split('/');
    const formattedEndDate = new Date(
      Number(endYear),
      Number(endMonth) - 1,
      Number(endDay),
    );

    // Verificar se a data é válida
    if (isNaN(formattedStartDate.getTime())) {
      throw new Error('Invalid start date format');
    }

    if (isNaN(formattedEndDate.getTime())) {
      throw new Error('Invalid end date format');
    }

    const car = await this.carRepository.findOne({ where: { id: carId } });

    if (!car) {
      throw new Error('Car not found');
    }

    const newReserve = this.reserveRepository.create({
      car: { id: carId },
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });

    await this.reserveRepository.save(newReserve);

    return newReserve;
  }
}
