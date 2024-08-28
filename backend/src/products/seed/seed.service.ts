import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/products.entity';
import * as path from 'path';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async seed() {
    const filePath = path.resolve(__dirname, 'baseProducts.xlsx');
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    await this.productRepository.clear();

    await this.productRepository.save(
      data.map((row: any) => ({
        name: row.name,
        technicalDetails: row.technicalDetails,
        annualValue: row.annualValue,
        photos: row.photos
          .slice(1, -1)
          .split(',')
          .map((url: string) => encodeURIComponent(url.trim())),
      })),
    );
  }
}
