import { PartialType } from '@nestjs/mapped-types';
import { CreateApartmentDto } from './create-apartment.dto';

/**
 * This DTO is used to filter apartments based on optional criteria.
 * All fields are derived from CreateApartmentDto and are optional.
 */

export class FilterApartmentDto extends PartialType(CreateApartmentDto) {}
