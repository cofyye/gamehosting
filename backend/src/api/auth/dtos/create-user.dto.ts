import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'The name must contain only characters.' })
  @MaxLength(20, {
    message: 'The name must contain a maximum of 20 characters.',
  })
  @MinLength(2, { message: 'The name must contain at least 2 characters.' })
  @IsNotEmpty({ message: 'The name field must not be empty.' })
  public readonly firstName: string;

  @IsString({ message: 'The last name must contain only characters.' })
  @MaxLength(20, {
    message: 'The last name must contain a maximum of 20 characters.',
  })
  @MinLength(2, {
    message: 'The last name must contain at least 2 characters.',
  })
  @IsNotEmpty({ message: 'The last name field must not be empty.' })
  public readonly lastName: string;

  @Matches(new RegExp('^[a-z0-9._]+([._]?[a-z0-9]+)*$', 'gm'), {
    message:
      'The username is not valid. Allowed characters are: a-z, 0-9, _ and . (dot).',
  })
  @MaxLength(20, {
    message: 'The username must contain a maximum of 20 characters.',
  })
  @MinLength(3, {
    message: 'The username must contain at least 3 characters.',
  })
  @IsNotEmpty({ message: 'The username field must not be empty.' })
  public readonly username: string;

  @IsEmail({}, { message: 'Please enter a valid email address.' })
  @MaxLength(100, {
    message: 'The email address must contain a maximum of 100 characters.',
  })
  @IsNotEmpty({ message: 'The email address field must not be empty.' })
  public readonly email: string;

  @MaxLength(32, {
    message: 'The password must contain a maximum of 32 characters.',
  })
  @MinLength(8, { message: 'The password must contain at least 8 characters.' })
  @IsNotEmpty({ message: 'The password field must not be empty.' })
  public readonly password: string;

  public avatar: string;
}
