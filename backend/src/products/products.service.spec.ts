import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  const mockProductRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const result = [
        {
          id: '1',
          name: 'Test Product',
          technicalDetails: 'Details',
          annualValue: '100',
          photos: ['url1', 'url2'],
          generateId: function (): void {
            throw new Error('Function not implemented.');
          },
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(result);

      expect(await service.getAllProducts()).toEqual(result);
    });
  });

  describe('getProductById', () => {
    it('should return a product by ID', async () => {
      const result = new Product();
      result.id = '1';
      result.name = 'Test Product';
      result.technicalDetails = 'Details';
      result.annualValue = '100';
      result.photos = ['url1', 'url2'];

      jest.spyOn(repository, 'findOne').mockResolvedValue(result);

      expect(await service.getProductById('1')).toEqual(result);
    });

    it('should throw a NotFoundException if product not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.getProductById('nonexistentId')).rejects.toThrow(
        new NotFoundException('Product with ID nonexistentId not found'),
      );
    });
  });
});
