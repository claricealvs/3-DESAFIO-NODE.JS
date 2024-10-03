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
    if (
      !model ||
      !color ||
      !year ||
      !valuePerDay ||
      !acessories ||
      !numberOfPassengers
    ) {
      throw new Error('All fields are required.');
    }

    if (![model, color].every((value) => typeof value === 'string')) {
      throw new Error('Incompatible data value.');
    }

    if (
      ![year, valuePerDay, numberOfPassengers].every(
        (value) => typeof value === 'number',
      )
    ) {
      throw new Error('Incompatible data value.');
    }

    if (year < 1950 || year > 2023) {
      throw new Error('Year of manufacture must be between 1950 and 2023.');
    }

    if (!acessories || acessories.length === 0) {
      throw new Error('At least one accessory is required.');
    }

    const uniqueAcessories = new Set(acessories);
    if (uniqueAcessories.size !== acessories.length) {
      throw new Error('Duplicate accessories are not allowed.');
    }

    for (const acessory of acessories) {
      if (!Object.values(AcessoryEnum).includes(acessory)) {
        throw new Error(`Invalid accessory: ${acessory}`);
      }
    }

    const newCar = this.carRepository.create({
      model,
      color,
      year,
      valuePerDay,
      acessories,
      numberOfPassengers,
    });

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

  async deleteCar(id: string): Promise<void> {
    const existingCar = await this.carRepository.findOne({
      where: { id },
    });

    if (!existingCar) {
      throw new Error('The inserted car does not exist.');
    }

    await this.carRepository.delete(id);
  }
}
