import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class GetExchangeRatesQueryRequestDto {
  @Expose()
  @ApiProperty({
    type: () => String,
    description: 'Format: dd-mm-yyyy',
    required: false,
  })
  @IsString()
  @IsOptional()
  date?: string;
}
