import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  PASSWORD_LOWERCASE_REGEX,
  PASSWORD_NUMBER_REGEX,
  PASSWORD_SPECIALCHAR_REGEX,
  PASSWORD_UPPERCASE_REGEX,
} from 'src/shared/utils/regex.constants';

export class ChangePasswordDto {
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

  @MaxLength(32, {
    message: 'The confirm password must contain a maximum of 32 characters.',
  })
  @Matches(PASSWORD_SPECIALCHAR_REGEX, {
    message:
      'The confirm password must contain at least one special character.',
  })
  @Matches(PASSWORD_NUMBER_REGEX, {
    message: 'The confirm password must contain at least one number.',
  })
  @Matches(PASSWORD_UPPERCASE_REGEX, {
    message: 'The confirm password must contain at least one uppercase letter.',
  })
  @Matches(PASSWORD_LOWERCASE_REGEX, {
    message: 'The confirm password must contain at least one lowercase letter.',
  })
  @MinLength(6, {
    message: 'The confirm password must contain at least 6 characters.',
  })
  @IsNotEmpty({ message: 'The confirm password field must not be empty.' })
  public readonly confirmPassword: string;

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
