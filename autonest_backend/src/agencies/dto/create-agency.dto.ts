// dto/create-agency.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class CreateAgencyDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsOptional()
  logo?: string;

  @IsOptional()
  ice?: string;

  @IsOptional()
  rc?: string;

  @IsOptional()
  patente?: string;

  @IsOptional()
  cnss?: string;

  @IsOptional()
  if?: string;
}
