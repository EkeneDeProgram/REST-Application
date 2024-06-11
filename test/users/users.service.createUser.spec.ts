import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../src/users/users.service';
import { UsersRepository } from '../../src/users/users.repository';
import { RabbitMQService } from '../../src/rabbitmq/rabbitmq.service';
import { HttpService } from '@nestjs/axios';

// Mock dependencies
const mockUsersRepository = {
  createUser: jest.fn(),
};

const mockRabbitMQService = {
  publish: jest.fn(),
};

const mockHttpService = {
  // Add methods that are used in your UsersService, e.g., get, post, etc.
  get: jest.fn(),
};

describe('UsersService - createUser', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockUsersRepository },
        { provide: RabbitMQService, useValue: mockRabbitMQService },
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    it('should create a new user and publish an event', async () => {
      const email = 'test@example.com';
      const userId = 'user123';
      const user = { id: userId, email };

      mockUsersRepository.createUser.mockResolvedValue(user);
      mockRabbitMQService.publish.mockResolvedValue(null);

      const result = await service.createUser(email, userId);

      expect(mockUsersRepository.createUser).toHaveBeenCalledWith(
        email,
        userId,
      );
      expect(mockRabbitMQService.publish).toHaveBeenCalledWith('user_created', {
        email,
      });
      expect(result).toEqual(user);
    });
  });
});
