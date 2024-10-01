import { Repository } from 'typeorm';
import connect from '../../database/connection';
import { Reserve } from '../../database/entities/Reserve';

export class ReserveService {
  private reserveRepository!: Repository<Reserve>;

  constructor() {
    this.initializeRepository();
  }

  private async initializeRepository() {
    const connection = await connect();
    this.reserveRepository = connection.getRepository(Reserve);
  }
}
