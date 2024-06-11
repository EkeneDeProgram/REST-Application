import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../src/users/users.controller';
import { UsersService } from '../../src/users/users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUserAvatar: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('getUserAvatar', () => {
    it('should return the avatar URL for a given user ID', async () => {
      const userId = 'userId';
      const avatarUrl = 'http://example.com/avatar.jpg';

      jest.spyOn(usersService, 'getUserAvatar').mockResolvedValue(avatarUrl);

      const result = await usersController.getUserAvatar(userId);

      expect(result).toEqual(avatarUrl);
      expect(usersService.getUserAvatar).toHaveBeenCalledWith(userId);
    });
  });
});
