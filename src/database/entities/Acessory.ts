import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Car } from './Car';

@Entity('acessories') // Nome da tabela no banco de dados
export class Acessory {
  @PrimaryGeneratedColumn() // Chave primária gerada automaticamente
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Car, (car) => car.acessories)
  car!: Car; // Cada acessório está associado a um único carro
}
