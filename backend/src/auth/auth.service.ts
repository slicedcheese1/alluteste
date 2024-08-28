import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthPayloadDTO } from './dto/auth.dto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser({ username, password }: AuthPayloadDTO) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || user.password !== password) {
      return null;
    }
    return this.jwtService.sign({
      id: user.id,
      username: user.username,
    });
  }

  async createUser(payload: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { username: payload.username },
    });
    if (existingUser) {
      throw new Error('User already exists');
    }
    const newUser = this.userRepository.create(payload);
    await this.userRepository.save(newUser);
    return { id: newUser.id, username: newUser.username };
  }
}
