import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class AddGameDto {
  @IsString({ message: 'The name must contain only characters.' })
  @MaxLength(30, {
    message: 'The name must contain a maximum of 30 characters.',
  })
  @MinLength(2, { message: 'The name must contain at least 2 characters.' })
  @IsNotEmpty({ message: 'The name field must not be empty.' })
  public readonly name: string;

  @MaxLength(20, {
    message: 'The gamedig tag must contain a maximum of 10 characters.',
  })
  @MinLength(2, {
    message: 'The gamedig tag must contain at least 2 characters.',
  })
  @IsNotEmpty({ message: 'The gamedig tag field must not be empty.' })
  public readonly gamedigTag: string;

  @Max(1000, {
    message: 'The maximum value for the price per slot must be 1000.',
  })
  @IsInt({ message: 'The price must be in numeric format.' })
  @IsNotEmpty({ message: 'The price per slot field must not be empty.' })
  public readonly pricePerSlot: number;

  @Max(65535, {
    message: 'The maximum value for the start port must be 65535.',
  })
  @Min(1, { message: 'The minimum value for the start port must be 1.' })
  @IsInt({ message: 'The start port must be in numeric format.' })
  @IsNotEmpty({ message: 'The start port field must not be empty.' })
  public readonly startPort: number;

  @Max(65535, {
    message: 'The maximum value for the end port must be 65535.',
  })
  @Min(1, { message: 'The minimum value for the end port must be 1.' })
  @IsInt({ message: 'The end port must be in numeric format.' })
  @IsNotEmpty({ message: 'The end port field must not be empty.' })
  public readonly endPort: number;

  @Max(100, {
    message: 'The maximum value for the minimum slot must be 100.',
  })
  @Min(1, {
    message: 'The minimum value for the minimum slot must be 1.',
  })
  @IsInt({ message: 'The minimum slot must be in numeric format.' })
  @IsNotEmpty({ message: 'The minimum slot field must not be empty.' })
  public readonly slotMin: number;

  @Max(10000, {
    message: 'The maximum value for the maximum slot must be 10000.',
  })
  @Min(1, {
    message: 'The minimum value for the maximum slot must be 1.',
  })
  @IsInt({ message: 'The maximum slot must be in numeric format.' })
  @IsNotEmpty({ message: 'The maximum slot field must not be empty.' })
  public readonly slotMax: number;

  @MaxLength(2500, {
    message: 'The description must contain a maximum of 2500 characters.',
  })
  @MinLength(10, {
    message: 'The description must contain at least 10 characters.',
  })
  @IsNotEmpty({ message: 'The description field must not be empty.' })
  public readonly description: string;

  public icon: string;
}
