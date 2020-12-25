import { Test, TestingModule } from '@nestjs/testing';
import { EmailsResolver } from './emails.resolver';
import { EmailsService } from './emails.service';

const mockData = {
  email: 'any@mail.com',
  name: 'any',
};

describe('EmailResolver', () => {
  let resolver;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailsResolver,
        {
          provide: EmailsService,
          useFactory: () => ({
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          }),
        },
      ],
    }).compile();

    resolver = module.get<EmailsResolver>(EmailsResolver);
    service = module.get<EmailsService>(EmailsService);
  });

  describe('findAll()', () => {
    it('should be able to call service.findAll', async () => {
      await resolver.findAll();

      expect(service.findAll).toBeCalled();
    });

    it('should be able to return service.findAll', async () => {
      (service.findAll as jest.Mock).mockReturnValue([mockData]);

      expect(await resolver.findAll()).toEqual([mockData]);
    });
  });

  describe('findOne()', () => {
    it('should be able to call service.findOne with correct email', async () => {
      await resolver.findOne(mockData.email);

      expect(service.findOne).toBeCalledWith(mockData.email);
    });

    it('should be able to return service.findOne', async () => {
      (service.findOne as jest.Mock).mockReturnValue(mockData);

      expect(await resolver.findOne(mockData.email)).toEqual(mockData);
    });
  });

  describe('createEmail()', () => {
    it('should be able to call service.create with correct email', async () => {
      await resolver.createEmail(mockData);

      expect(service.create).toBeCalledWith(mockData);
    });

    it('should be able to return service.create', async () => {
      (service.create as jest.Mock).mockReturnValue(mockData);

      expect(await resolver.createEmail(mockData)).toEqual(mockData);
    });
  });

  describe('updateEmail()', () => {
    it('should be able to call service.update with correct params', async () => {
      await resolver.updateEmail(mockData);
      expect(service.update).toBeCalledWith(mockData);
    });

    it('should be able to return service.create', async () => {
      (service.update as jest.Mock).mockReturnValue(mockData);
      expect(await resolver.updateEmail(mockData)).toEqual(mockData);
    });
  });

  describe('removeEmail()', () => {
    it('should be able to call service.removeEmail with correct email', async () => {
      await resolver.removeEmail('any@email.com');
      expect(service.remove).toBeCalledWith('any@email.com');
    });

    it('should be able to return service.remove', async () => {
      (service.remove as jest.Mock).mockReturnValue(mockData);
      expect(await resolver.removeEmail('any@email.com')).toEqual(mockData);
    });
  });
});
