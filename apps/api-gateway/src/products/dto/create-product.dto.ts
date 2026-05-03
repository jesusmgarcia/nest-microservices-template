import { Type } from 'class-transformer';
import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public name!: string;
  @Min(0)
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Type(() => Number)
  public price!: number;
}
