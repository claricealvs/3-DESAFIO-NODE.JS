import { Repository } from 'typeorm';
import connect from '../../database/connection';
import { Reserve } from '../../database/entities/Reserve';
import { Car } from '../../database/entities/Car';
import { User } from '../../database/entities/User';
import { differenceInDays, parse } from 'date-fns';

export class ReserveService {
  private reserveRepository!: Repository<Reserve>;
  private carRepository!: Repository<Car>;
  private userRepository!: Repository<User>;

  constructor() {
    this.initializeRepository();
  }

  private async initializeRepository() {
    const connection = await connect();
    this.reserveRepository = connection.getRepository(Reserve);
    this.carRepository = connection.getRepository(Car);
    this.userRepository = connection.getRepository(User);
  }

  async getAllReserves() {
    try {
      return await this.reserveRepository.find({
        relations: ['car', 'user'],
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error retrieving reserve: ${error.message}`);
      } else {
        throw new Error(`Unknown error retrieving reserve`);
      }
    }
  }

  async getReserveById(id: number): Promise<Reserve | null> {
    try {
      const reserve = await this.reserveRepository.findOne({
        where: { id },
        relations: ['car', 'user'],
      });
      return reserve ? reserve : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error retrieving reserve with ID ${id}: ${error.message}`,
        );
      } else {
        throw new Error('Unknown error retrieving reserve');
      }
    }
  }

  async createReserve(
    carId: number,
    userId: number,
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
      Number(startDay) + 1,
    );

    const [endDay, endMonth, endYear] = endDate.split('/');
    const formattedEndDate = new Date(
      Number(endYear),
      Number(endMonth) - 1,
      Number(endDay) + 1,
    );

    // Verificar se a data é válida
    if (
      isNaN(formattedStartDate.getTime()) ||
      isNaN(formattedEndDate.getTime())
    ) {
      throw new Error('Invalid start date format');
    }

    if (formattedEndDate <= formattedStartDate) {
      throw new Error('End date must be after start date.');
    }

    const car = await this.carRepository.findOne({ where: { id: carId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!car) {
      throw new Error('Car not found');
    }

    if (!user) {
      throw new Error('User not found');
    }

    const timeDifference = Math.abs(
      formattedEndDate.getTime() - formattedStartDate.getTime(),
    );
    const days = Math.ceil(timeDifference / (1000 * 3600 * 24));

    const finalValue = car.valuePerDay * days;

    const newReserve = this.reserveRepository.create({
      car: { id: carId },
      user: { id: userId },
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      finalValue: finalValue,
    });

    await this.reserveRepository.save(newReserve);

    return newReserve;
  }

  async updateReserve(
    id: number,
    carId: number,
    userId: number,
    startDate: string,
    endDate: string,
  ): Promise<Reserve> {
    const existingReserve = await this.reserveRepository.findOne({
      where: { id },
    });

    if (!existingReserve) {
      throw new Error('The inserted reserve does not exist.');
    }

    if (![startDate, endDate].every((value) => typeof value === 'string')) {
      throw new Error('Incompatible data value.');
    }

    const [startDay, startMonth, startYear] = startDate.split('/');
    const formattedStartDate = new Date(
      Number(startYear),
      Number(startMonth) - 1,
      Number(startDay) + 1,
    );

    const [endDay, endMonth, endYear] = endDate.split('/');
    const formattedEndDate = new Date(
      Number(endYear),
      Number(endMonth) - 1,
      Number(endDay) + 1,
    );

    // Verificar se a data é válida
    if (isNaN(formattedStartDate.getTime())) {
      throw new Error('Invalid start date format');
    }

    if (isNaN(formattedEndDate.getTime())) {
      throw new Error('Invalid end date format');
    }

    const car = await this.carRepository.findOne({ where: { id: carId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!car) {
      throw new Error('Car not found');
    }

    if (!user) {
      throw new Error('User not found');
    }

    const newReserve = this.reserveRepository.create({
      id: id,
      car: { id: carId },
      user: { id: userId },
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });

    await this.reserveRepository.save(newReserve);

    return newReserve;
  }

  async deleteReserve(id: string): Promise<void> {
    const existingReserve = await this.reserveRepository.findOne({
      where: { id },
    });

    if (!existingReserve) {
      throw new Error('The inserted reserve does not exist.');
    }

    await this.reserveRepository.delete(id);
  }
}
