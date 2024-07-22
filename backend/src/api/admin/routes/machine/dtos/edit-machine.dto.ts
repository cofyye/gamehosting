import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';

export class EditGameDto {
  @MaxLength(30, {
    message: 'The name must contain a maximum of 30 characters.',
  })
  @MinLength(2, { message: 'The name must contain at least 2 characters.' })
  @IsNotEmpty({ message: 'The name field must not be empty.' })
  public readonly name: string;

  @Max(65535, {
    message: 'The maximum value for the start port must be 65535.',
  })
  @Min(1, { message: 'The minimum value for the start port must be 1.' })
  @IsNotEmpty({ message: 'The start port field must not be empty.' })
  public readonly startPort: number;

  @Max(65535, {
    message: 'The maximum value for the end port must be 65535.',
  })
  @Min(1, { message: 'The minimum value for the end port must be 1.' })
  @IsNotEmpty({ message: 'The end port field must not be empty.' })
  public readonly endPort: number;

  @Max(100, {
    message: 'The maximum value for the minimum slot must be 100.',
  })
  @Min(1, {
    message: 'The minimum value for the minimum slot must be 1.',
  })
  @IsNotEmpty({ message: 'The minimum slot field must not be empty.' })
  public readonly slotMin: number;

  @Max(10000, {
    message: 'The maximum value for the maximum slot must be 10000.',
  })
  @Min(1, {
    message: 'The minimum value for the maximum slot must be 1.',
  })
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
