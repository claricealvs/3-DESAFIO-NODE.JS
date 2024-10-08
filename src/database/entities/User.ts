import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reserve } from './Reserve';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  cpf!: string;

  @Column({ type: 'date' })
  birth!: Date;

  @Column()
  cep!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Reserve, (reserve) => reserve.user)
  reserves!: Reserve[];
}
