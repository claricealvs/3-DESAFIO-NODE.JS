import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Car } from './Car';

@Entity('reserves')
export class Reserve {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  startDate!: Date;

  @Column({ type: 'date' })
  endDate!: Date;

  @ManyToOne(() => Car, (car) => car.reserves)
  car!: Car; // Cada reserva está associada a um único veículo
}
