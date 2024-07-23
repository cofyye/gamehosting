import {
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class AddServerDto {
  @IsUUID('4', {
    message: 'The user ID is not valid.',
  })
  @IsNotEmpty({ message: 'The user ID field must not be empty.' })
  public readonly userId: string;

  @IsUUID('4', {
    message: 'The machine ID is not valid.',
  })
  @IsNotEmpty({ message: 'The machine ID field must not be empty.' })
  public readonly machineId: string;

  @IsUUID('4', {
    message: 'The game ID is not valid.',
  })
  @IsNotEmpty({ message: 'The game ID field must not be empty.' })
  public readonly gameId: string;

  @IsUUID('4', {
    message: 'The mod ID is not valid.',
  })
  @IsNotEmpty({ message: 'The mod ID field must not be empty.' })
  public readonly modId: string;

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
  public readonly slot: number;

  @Max(65535, {
    message: 'The maximum value for the port must be 65535.',
  })
  @Min(1, { message: 'The minimum value for the port must be 1.' })
  @IsInt({ message: 'The port must be in numeric format.' })
  @IsNotEmpty({ message: 'The port field must not be empty.' })
  public readonly port: number;

  @Max(1000, {
    message: 'The maximum value for the custom price must be 1000.',
  })
  @IsNotEmpty({ message: 'The custom price field must not be empty.' })
  @IsOptional()
  public readonly customPrice: number;

  @IsDateString({}, { message: 'Please enter a valid date.' })
  @IsNotEmpty({ message: 'The expiration date field must not be empty.' })
  public readonly expirationDate: string;
}
