import { Repository } from 'typeorm';
import connect from '../../database/connection';
import { Car } from '../../database/entities/Car';
import { Acessory } from '../../database/entities/Acessory';

export class CarService {
  private carRepository!: Repository<Car>;

  constructor() {
    this.initializeRepository();
  }

  private async initializeRepository() {
    const connection = await connect();
    this.carRepository = connection.getRepository(Car);
  }

  async getAllCars() {
    try {
      return await this.carRepository.find({
        relations: ['acessories'],
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error retrieving sessions: ${error.message}`);
      } else {
        throw new Error(`Unknown error retrieving sessions`);
      }
    }
  }

  async createCar(
    model: string,
    color: string,
    year: number,
    valuePerDay: number,
    acessories: Acessory[],
    numberOfPassengers: number,
  ): Promise<Car> {
    const newCar = this.carRepository.create({
      model,
      color,
      year,
      valuePerDay,
      acessories,
      numberOfPassengers,
    });

    // Salvar no banco de dados
    await this.carRepository.save(newCar);

    return newCar;
  }
}
