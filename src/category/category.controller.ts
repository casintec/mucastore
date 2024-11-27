import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReturnCategoryDTO } from './dto/return-category.dto';
import { RoleUser } from 'src/user/enum/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { CategoryEntity } from './entities/category.entity';

@Roles(RoleUser.User, RoleUser.Admin)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(RoleUser.Admin, RoleUser.User)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async findAllCategories(): Promise<ReturnCategoryDTO[]> {
    return (await this.categoryService.findAllCategories()).map(
      (category) => new ReturnCategoryDTO(category));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findCategoryByName(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
