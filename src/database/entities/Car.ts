import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Acessory } from './Acessory';
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

  @OneToMany(() => Acessory, (acessory) => acessory.car)
  acessories!: Acessory[];

  @OneToMany(() => Reserve, (reserve) => reserve.car)
  reserves!: Reserve[];
}
