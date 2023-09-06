import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntityWithIdAndTimestamps } from './facades/base-entity-with-id-and-timestamps';
import { Session } from './session.entity';

export enum UserRole {
  /**
   * Суперпользователь только один и он может создавать всех, даже админов
   */
  SUPERUSER = 'superuser',
  /**
   * Админов может быть много.
   * Админы могут решать прикладные задачи в админке
   * Админом может быть разработчик, который тестирует функционал или фиксит что-то
   * Админ не может править роли других админов и роль суперпользователя
   */
  ADMIN = 'admin',
  /**
   * Менеджер - это аккаунт работника какого-то подразделения. Он может выполнять какие-то
   * предусмотренные бизнес-функции:
   * - создавать ссылки на оплату для пользователей
   * - подтверждать оплату
   */
  MANAGER = 'manager',
  /**
   * Работник - это конечный мастер, который выполняет поступающие заказы
   * Пока для него не предусмотрен никакой функционал
   */
  EMPLOYEE = 'employee',
}

export type UserData = Record<string, any>;

@Entity({ name: 'users' })
export class User extends BaseEntityWithIdAndTimestamps {
  @Column('text')
  public role: UserRole;

  @Column('text', { unique: true, nullable: false })
  public username: string;

  @Column('text')
  public name: string;

  @Column('text')
  public phone: string;

  @Column('text')
  public email: string;

  @Column('text')
  public password: string;

  @Column('jsonb', { default: {} })
  public data: UserData;
  
  @ManyToOne(() => Session, (session) => session.user)
  public sessions: Session[]
}
