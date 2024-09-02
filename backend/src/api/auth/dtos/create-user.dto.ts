import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  ALPHABETS_AND_SPACE_REGEX,
  PASSWORD_LOWERCASE_REGEX,
  PASSWORD_NUMBER_REGEX,
  PASSWORD_SPECIALCHAR_REGEX,
  PASSWORD_UPPERCASE_REGEX,
  USERNAME_REGEX,
} from 'src/shared/utils/regex.constants';

export class CreateUserDto {
  @Matches(ALPHABETS_AND_SPACE_REGEX, {
    message: 'The first name must contain only characters.',
  })
  @MaxLength(20, {
    message: 'The first name must contain a maximum of 20 characters.',
  })
  @MinLength(2, {
    message: 'The first name must contain at least 2 characters.',
  })
  @IsNotEmpty({ message: 'The first name field must not be empty.' })
  public readonly firstName: string;

  @Matches(ALPHABETS_AND_SPACE_REGEX, {
    message: 'The last name must contain only characters.',
  })
  @MaxLength(20, {
    message: 'The last name must contain a maximum of 20 characters.',
  })
  @MinLength(2, {
    message: 'The last name must contain at least 2 characters.',
  })
  @IsNotEmpty({ message: 'The last name field must not be empty.' })
  public readonly lastName: string;

  @Matches(USERNAME_REGEX, {
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

  @MaxLength(32, {
    message: 'The password must contain a maximum of 32 characters.',
  })
  @Matches(PASSWORD_SPECIALCHAR_REGEX, {
    message: 'The password must contain at least one special character.',
  })
  @Matches(PASSWORD_NUMBER_REGEX, {
    message: 'The password must contain at least one number.',
  })
  @Matches(PASSWORD_UPPERCASE_REGEX, {
    message: 'The password must contain at least one uppercase letter.',
  })
  @Matches(PASSWORD_LOWERCASE_REGEX, {
    message: 'The password must contain at least one lowercase letter.',
  })
  @MinLength(6, { message: 'The password must contain at least 6 characters.' })
  @IsNotEmpty({ message: 'The password field must not be empty.' })
  public readonly password: string;
}
