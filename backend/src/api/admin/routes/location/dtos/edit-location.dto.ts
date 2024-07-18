import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class EditLocationDto {
  @IsString({ message: 'The country must contain only characters.' })
  @MaxLength(30, {
    message: 'The country must contain a maximum of 30 characters.',
  })
  @MinLength(2, { message: 'The country must contain at least 2 characters.' })
  @IsNotEmpty({ message: 'The country field must not be empty.' })
  public readonly country: string;

  @IsString({ message: 'The town must contain only characters.' })
  @MaxLength(30, {
    message: 'The town must contain a maximum of 30 characters.',
  })
  @MinLength(2, { message: 'The town must contain at least 2 characters.' })
  @IsNotEmpty({ message: 'The town field must not be empty.' })
  public readonly town: string;

  public icon: string;
}
