import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class AddPlanDto {
  @IsUUID('4', {
    message: 'The game ID is not valid.',
  })
  @IsNotEmpty({ message: 'The game ID field must not be empty.' })
  public readonly gameId: string;

  @MaxLength(40, {
    message: 'The name must contain a maximum of 40 characters.',
  })
  @MinLength(2, { message: 'The name must contain at least 2 characters.' })
  @IsNotEmpty({ message: 'The name field must not be empty.' })
  public readonly name: string;

  @Max(65535, {
    message: 'The maximum value for the slot must be 65535.',
  })
  @Min(1, { message: 'The minimum value for the slot must be 1.' })
  @IsInt({ message: 'The slot must be in numeric format.' })
  @IsNotEmpty({ message: 'The slot field must not be empty.' })
  @IsOptional()
  public readonly slot: number;

  @Max(109951162777600, {
    message: 'The maximum value for the ram must be 10 TB in bytes.',
  })
  @Min(536870912, {
    message: 'The minimum value for the ram must be 512 MB in bytes.',
  })
  @IsInt({ message: 'The ram must be in numeric format.' })
  @IsNotEmpty({ message: 'The ram field must not be empty.' })
  @IsOptional()
  public readonly ram: number;

  @Max(100000, {
    message: 'The maximum value for the price must be 100000.',
  })
  @IsPositive({ message: 'The price value must be greater than zero.' })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 2,
    },
    {
      message:
        'The price must be in numeric format, with a maximum of 2 decimal places.',
    },
  )
  @IsNotEmpty({ message: 'The price field must not be empty.' })
  public readonly price: number;

  @Max(65535, {
    message: 'The maximum value for the CPU count must be 65535.',
  })
  @Min(1, { message: 'The minimum value for the CPU count must be 1.' })
  @IsInt({ message: 'The CPU count must be in numeric format.' })
  @IsNotEmpty({ message: 'The CPU count field must not be empty.' })
  @IsOptional()
  public readonly cpuCount: number;

  @MaxLength(2500, {
    message: 'The description must contain a maximum of 2500 characters.',
  })
  @MinLength(10, {
    message: 'The description must contain at least 10 characters.',
  })
  @IsNotEmpty({ message: 'The description field must not be empty.' })
  public readonly description: string;

  @IsNotEmpty({ message: 'The machines field must not be empty.' })
  public machines: string;
}
