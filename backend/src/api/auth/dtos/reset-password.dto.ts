import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  @MaxLength(100, {
    message: 'The email address must contain a maximum of 100 characters.',
  })
  @IsNotEmpty({ message: 'The email address field must not be empty.' })
  public readonly email: string;

  @MaxLength(12, {
    message: 'The token must be 12 characters long.',
  })
  @MinLength(12, {
    message: 'The token must be 12 characters long.',
  })
  @IsNotEmpty({ message: 'The token field must not be empty.' })
  public readonly token: string;
}
