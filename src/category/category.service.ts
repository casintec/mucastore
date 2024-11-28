import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ){}

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const category = await this.findCategoryByName(createCategoryDto.name).catch(
      () => undefined,
    );

    if (category) {
      throw new BadRequestException(
        `Category name ${createCategoryDto.name} exist`,
      );
    }
    return this.categoryRepository.save(createCategoryDto)
  }

  async findAllCategories(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find()

    if(!categories || categories.length === 0){
      throw new NotFoundException('No categories registered')
    }
    return categories;
  }

  async findCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        name,
      }
    })

    if(!category){
      throw new NotFoundException(`Category name: ${name} not found`)
    }

    return category;
  }

  async findCategoryById(categoryId: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
      }
    })

    if(!category){
      throw new NotFoundException(`Category id: ${categoryId} not found`)
    }

    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
