import { Repository } from 'typeorm';
import connect from '../../database/connection';
import { Car } from '../../database/entities/Car';
import { AcessoryEnum } from '../../database/enums/AcessoryEnum';

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
      return await this.carRepository.find();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error retrieving car: ${error.message}`);
      } else {
        throw new Error(`Unknown error retrieving car`);
      }
    }
  }

  async getCarById(id: number): Promise<Car | null> {
    try {
      const car = await this.carRepository.findOne({
        where: { id },
      });
      return car ? car : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error retrieving car with ID ${id}: ${error.message}`);
      } else {
        throw new Error('Unknown error retrieving car');
      }
    }
  }

  async createCar(
    model: string,
    color: string,
    year: number,
    valuePerDay: number,
    acessories: AcessoryEnum[],
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

  async updateCar(
    id: number,
    model: string,
    color: string,
    year: number,
    valuePerDay: number,
    acessories: AcessoryEnum[],
    numberOfPassengers: number,
  ) {
    const existingCar = await this.carRepository.findOne({
      where: { id },
    });

    if (!existingCar) {
      throw new Error('The inserted car does not exist.');
    }

    if ([model, color].every((value) => typeof value !== 'string')) {
      throw new Error('Incompatible data value.');
    }

    if (
      [id, year, valuePerDay, numberOfPassengers].every(
        (value) => typeof value !== 'number',
      )
    ) {
      throw new Error('Incompatible data value.');
    }

    await this.carRepository.update(id, {
      model,
      color,
      year,
      valuePerDay,
      acessories,
      numberOfPassengers,
    });

    const updatedCar = await this.carRepository.findOne({
      where: { id },
    });

    if (!updatedCar) {
      throw new Error('Error when searching for updated car.');
    }

    return updatedCar;
  }
}
