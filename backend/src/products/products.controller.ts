import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import axios from 'axios';
import { Response } from 'express';
import { ProductsService } from './products.service';
import { Product } from './entities/products.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved products',
    type: [Product],
  })
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved product',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async getProductById(@Param('id') id: string): Promise<Product> {
    try {
      return this.productsService.getProductById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get('images/:url')
  @ApiOperation({ summary: 'Retrieve an image by URL' })
  @ApiParam({
    name: 'url',
    description: 'Encoded URL of the image',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Successfully retrieved image' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  async getImage(@Param('url') url: string, @Res() res: Response) {
    const decodedUrl = decodeURIComponent(url);
    try {
      const response = await axios({
        url: decodedUrl,
        method: 'GET',
        responseType: 'stream',
      });
      res.setHeader('Content-Type', response.headers['content-type']);
      response.data.pipe(res);
    } catch (error) {
      res.status(404).send({
        message: `Cannot GET ${url}`,
        error: 'Not Found',
        statusCode: 404,
      });
    }
  }
}
