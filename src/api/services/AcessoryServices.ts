import { Repository } from 'typeorm';
import connect from '../../database/connection';
import { Acessory } from '../../database/entities/Acessory';

export class AcessoryService {
  private acessoryRepository!: Repository<Acessory>;

  constructor() {
    this.initializeRepository();
  }

  private async initializeRepository() {
    const connection = await connect();
    this.acessoryRepository = connection.getRepository(Acessory);
  }
}
