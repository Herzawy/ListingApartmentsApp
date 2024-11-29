import { IsNotEmpty, IsString, IsNumber, IsOptional, Min, Length } from 'class-validator';

export class CreateApartmentDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  readonly unitName: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  readonly unitNumber: string;

  @IsOptional()
  @IsString()
  @Length(3, 50)
  readonly project?: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}

//Using readonly here for Create this DTO because the data should typically remain constant after being created.

// No business logic here.
