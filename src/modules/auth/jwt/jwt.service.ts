import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class JwtService {
  constructor(private readonly jwt: Jwt) {}

  public generateAccessToken(user: User): string {
    const payload = {
      sub: user.id, // User's ID
      username: user.username, // Additional user data you want to include
    };

    // Create and sign the JWT token
    return this.jwt.sign(payload);
  }

  public generateRefreshToken(length = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }
}
