import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The unique identifier of the product' })
  id: string;

  @Column()
  @ApiProperty({ description: 'The name of the product' })
  name: string;

  @Column('text')
  @ApiProperty({ description: 'Technical details of the product' })
  technicalDetails: string;

  @Column()
  @ApiProperty({ description: 'The annual value of the product' })
  annualValue: string;

  @Column('simple-array')
  @ApiProperty({ description: 'Array of URLs of the product photos' })
  photos: string[];

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
