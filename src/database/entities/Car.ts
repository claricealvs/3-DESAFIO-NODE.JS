import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AcessoryEnum } from '../../database/enums/AcessoryEnum';
import { Reserve } from './Reserve';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  model!: string;

  @Column()
  color!: string;

  @Column()
  year!: number;

  @Column({ type: 'float' })
  valuePerDay!: number;

  @Column()
  numberOfPassengers!: number;

  @Column('simple-array')
  acessories!: AcessoryEnum[];

  @OneToMany(() => Reserve, (reserve) => reserve.car)
  reserves!: Reserve[];
}
