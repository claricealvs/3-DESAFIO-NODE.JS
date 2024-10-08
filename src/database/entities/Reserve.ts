import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Car } from './Car';
import { User } from './User';

@Entity('reserves')
export class Reserve {
  [x: string]: any;

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  startDate!: Date;

  @Column({ type: 'date' })
  endDate!: Date;

  @Column({ type: 'decimal' })
  finalValue!: number;

  @ManyToOne(() => Car, (car) => car.reserves)
  @JoinColumn({ name: 'car_id' })
  car!: Car; // Cada reserva está associada a um único veículo

  @ManyToOne(() => User, (user) => user.reserves)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
