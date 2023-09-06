import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findByPhoneNumber(phone: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { phone } });
  }

  async createUser(
    username: string,
    name: string,
    phone: string,
    email: string,
    password: string,
  ): Promise<User> {
    const user = new User();
    user.role = UserRole.EMPLOYEE;
    user.username = username;
    user.name = name;
    user.phone = phone;
    user.email = email;
    user.password = password; // TODO hash password
    return this.userRepository.save(user);
  }
}
