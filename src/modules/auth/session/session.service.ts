import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/entities/session.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async create(user: User, refreshToken: string): Promise<Session> {
    const session = new Session();
    session.refreshToken = refreshToken;
    session.user = user;
    return this.sessionRepository.save(session);
  }

  async findByRefreshToken(refreshToken: string): Promise<Session | null> {
    return this.sessionRepository.findOne({ where: { refreshToken } });
  }

  // ... other methods for managing sessions
}
