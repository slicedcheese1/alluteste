import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SeedService } from './seed/seed.service';
import { Product } from './entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService, SeedService],
  controllers: [ProductsController],
  exports: [ProductsService, SeedService],
})
export class ProductsModule {}
