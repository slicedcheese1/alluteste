import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/products.entity';
import { Response } from 'express';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    getAllProducts: jest.fn(),
    getProductById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const result = [new Product(), new Product()];
      jest.spyOn(service, 'getAllProducts').mockResolvedValue(result);

      expect(await controller.getAllProducts()).toEqual(result);
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

      jest.spyOn(service, 'getProductById').mockResolvedValue(result);

      expect(await controller.getProductById('1')).toEqual(result);
    });

    it('should throw a NotFoundException if product not found', async () => {
      jest.spyOn(service, 'getProductById').mockImplementation(() => {
        throw new NotFoundException('Product with ID nonexistentId not found');
      });

      await expect(controller.getProductById('nonexistentId')).rejects.toThrow(
        new NotFoundException('Product with ID nonexistentId not found'),
      );
    });
  });

  describe('getImage', () => {
    it('should return 404 if image not found', async () => {
      const url = 'http://example.com/nonexistent.jpg';

      mockedAxios.get.mockRejectedValue(new Error('Not Found'));

      const res: Partial<Response> = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.getImage(url, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        message: `Cannot GET ${url}`,
        error: 'Not Found',
        statusCode: 404,
      });
    });
  });
});
