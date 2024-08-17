import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AddLocationDto {
  @MaxLength(50, {
    message: 'The country must contain a maximum of 50 characters.',
  })
  @MinLength(2, { message: 'The country must contain at least 2 characters.' })
  @IsNotEmpty({ message: 'The country field must not be empty.' })
  public readonly country: string;

  @MaxLength(10, {
    message: 'The country tag must contain a maximum of 10 characters.',
  })
  @MinLength(2, {
    message: 'The country tag must contain at least 2 characters.',
  })
  @IsNotEmpty({ message: 'The country tag field must not be empty.' })
  public countryTag: string;

  @MaxLength(50, {
    message: 'The city must contain a maximum of 50 characters.',
  })
  @MinLength(2, { message: 'The city must contain at least 2 characters.' })
  @IsNotEmpty({ message: 'The city field must not be empty.' })
  public readonly city: string;
}
