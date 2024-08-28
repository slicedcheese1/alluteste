/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { AuthPayloadDTO } from './dto/auth.dto';
import { CreateUserDto } from './dto/create-user.dto';

const mockUserRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return a JWT token if validation is successful', async () => {
      const user = { id: 1, username: 'testuser', password: 'testpass' };
      const payload: AuthPayloadDTO = {
        username: 'testuser',
        password: 'testpass',
      };
      mockUserRepository.findOne.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue('signed-token');

      const result = await service.validateUser(payload);

      expect(result).toEqual('signed-token');
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { username: 'testuser' },
      });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        id: user.id,
        username: user.username,
      });
    });

    it('should return null if user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      const payload: AuthPayloadDTO = {
        username: 'testuser',
        password: 'testpass',
      };

      const result = await service.validateUser(payload);

      expect(result).toBeNull();
    });

    it('should return null if password is incorrect', async () => {
      const user = { id: 1, username: 'testuser', password: 'wrongpass' };
      const payload: AuthPayloadDTO = {
        username: 'testuser',
        password: 'testpass',
      };
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.validateUser(payload);

      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const payload: CreateUserDto = {
        username: 'newuser',
        password: 'newpass',
        name: 'New User',
      };
      const newUser = { id: 1, username: 'newuser' };
      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue(newUser);
      mockUserRepository.save.mockResolvedValue(newUser);

      const result = await service.createUser(payload);

      expect(result).toEqual({ id: newUser.id, username: newUser.username });
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { username: payload.username },
      });
      expect(mockUserRepository.create).toHaveBeenCalledWith(payload);
      expect(mockUserRepository.save).toHaveBeenCalledWith(newUser);
    });

    it('should throw an error if user already exists', async () => {
      const payload: CreateUserDto = {
        username: 'existinguser',
        password: 'newpass',
        name: 'Existing User',
      };
      const existingUser = { id: 1, username: 'existinguser' };
      mockUserRepository.findOne.mockResolvedValue(existingUser);

      await expect(service.createUser(payload)).rejects.toThrow(
        'User already exists',
      );
    });
  });
});
