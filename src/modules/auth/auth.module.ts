import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtService } from './jwt/jwt.service';
import { SessionService } from './session/session.service';
import { Session } from 'src/entities/session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Session]), // Replace with your User entity
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    JwtService,
    SessionService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
