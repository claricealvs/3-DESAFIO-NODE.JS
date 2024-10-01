import { Repository } from 'typeorm';
import connect from '../../database/connection';
import { Car } from '../../database/entities/Car';

export class CarServices {
  private carRepository!: Repository<Car>;

  constructor() {
    this.initializeRepository();
  }

  private async initializeRepository() {
    const connection = await connect();
    this.carRepository = connection.getRepository(Car);
  }
}
