/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { CreateUserDto } from './dto/create-user.dto';

const mockAuthService = {
  createUser: jest.fn(),
  validateUser: jest.fn(),
};

const mockJwtAuthGuard = {
  canActivate: jest.fn(() => true),
};

const mockLocalGuard = {
  canActivate: jest.fn(() => true),
};

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .overrideGuard(LocalGuard)
      .useValue(mockLocalGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'testpass',
        name: 'Test User',
      };
      const result = { id: 1, username: 'testuser' };

      mockAuthService.createUser.mockResolvedValue(result);

      expect(await controller.register(createUserDto)).toEqual(result);
      expect(mockAuthService.createUser).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw an error if user already exists', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'testpass',
        name: 'Test User',
      };

      mockAuthService.createUser.mockRejectedValue(
        new Error('User already exists'),
      );

      await expect(controller.register(createUserDto)).rejects.toThrow(
        'User already exists',
      );
    });
  });

  describe('login', () => {
    it('should login a user', () => {
      const req = { user: { id: 1, username: 'testuser' } };

      expect(controller.login(req as any)).toEqual(req.user);
    });
  });

  describe('status', () => {
    it('should return the current user status', () => {
      const req = { user: { id: 1, username: 'testuser' } };

      expect(controller.status(req as any)).toEqual(req.user);
    });
  });
});
