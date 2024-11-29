import { Controller, Get, Post, Body, Param, Query, HttpCode, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { FilterApartmentDto } from './dto/filter-apartment.dto';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createApartmentDto: CreateApartmentDto) {

    return this.apartmentsService.create(createApartmentDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() filter: FilterApartmentDto) {
    return this.apartmentsService.findAll(filter);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.apartmentsService.findOne(id);
  }
}
