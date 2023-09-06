import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from 'src/entities/user.entity';
import { Session } from 'src/entities/session.entity';
import { SessionService } from './session/session.service';
import { JwtService } from './jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly jwtService: JwtService,
  ) {}

  public async findSessionByRefreshToken(
    refreshToken: string,
  ): Promise<Session | null> {
    return this.sessionService.findByRefreshToken(refreshToken);
  }

  public async validateUser(
    phone: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findByPhoneNumber(phone);

    if (user && (await this.comparePasswords(password, user.password))) {
      return user;
    }

    return null;
  }

  public async register(
    username: string,
    name: string,
    phone: string,
    email: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await this.hashPassword(password);
    return this.userService.createUser(
      username,
      name,
      phone,
      email,
      hashedPassword,
    );
  }

  public async loginByPhone(
    phone: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.validateUser(phone, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.generateAccessToken(user);
    const session = await this.sessionService.create(
      user,
      this.jwtService.generateRefreshToken(),
    );

    return { accessToken, refreshToken: session.refreshToken };
  }

  public async refreshToken(userId: number, refreshToken: string) {
    const session = await this.sessionService.findByRefreshToken(refreshToken);

    if (!session || session.userId !== userId) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Generate a new access token
    const user = await this.userService.findById(userId);
    const accessToken = this.jwtService.generateAccessToken(user);

    return { accessToken };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private async comparePasswords(
    enteredPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, hashedPassword);
  }
}
