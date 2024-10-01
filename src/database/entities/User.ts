import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
