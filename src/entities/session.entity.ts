// session.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int', { nullable: false })
  public userId: number;
  @ManyToOne(() => User, (user) => user.sessions)
  public user: User;

  @Column('text', { nullable: false })
  public refreshToken: string;
}
