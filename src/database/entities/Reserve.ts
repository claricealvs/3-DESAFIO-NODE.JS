import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Car } from './Car';

@Entity('reserves')
export class Reserve {
  [x: string]: any;

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  startDate!: Date;

  @Column({ type: 'date' })
  endDate!: Date;

  @ManyToOne(() => Car, (car) => car.reserves)
  @JoinColumn({ name: 'car_id' })
  car!: Car; // Cada reserva está associada a um único veículo
}
