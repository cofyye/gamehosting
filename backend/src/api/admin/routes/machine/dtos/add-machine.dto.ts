import {
  IsInt,
  IsIP,
  IsNotEmpty,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class AddMachineDto {
  @IsUUID('4', {
    message: 'The location ID is not valid.',
  })
  @IsNotEmpty({ message: 'The location ID field must not be empty.' })
  public readonly locationId: string;

  @MaxLength(50, {
    message: 'The name must contain a maximum of 50 characters.',
  })
  @MinLength(2, { message: 'The name must contain at least 2 characters.' })
  @IsNotEmpty({ message: 'The name field must not be empty.' })
  public readonly name: string;

  @IsIP('4', { message: 'Please enter a valid IP address.' })
  @MaxLength(15, {
    message: 'The IP must contain a maximum of 15 characters.',
  })
  @IsNotEmpty({ message: 'The IP field must not be empty.' })
  public readonly ip: string;

  @MaxLength(20, {
    message: 'The username must contain a maximum of 20 characters.',
  })
  @IsNotEmpty({ message: 'The username field must not be empty.' })
  public readonly username: string;

  @MaxLength(100, {
    message: 'The password must contain a maximum of 100 characters.',
  })
  @IsNotEmpty({ message: 'The password field must not be empty.' })
  public readonly password: string;

  @Max(65535, {
    message: 'The maximum value for the SSH port must be 65535.',
  })
  @Min(1, { message: 'The minimum value for the SSH port must be 1.' })
  @IsInt({ message: 'The SSH port must be in numeric format.' })
  @IsNotEmpty({ message: 'The SSH port field must not be empty.' })
  public readonly sshPort: number;

  @Max(65535, {
    message: 'The maximum value for the FTP port must be 65535.',
  })
  @Min(1, { message: 'The minimum value for the FTP port must be 1.' })
  @IsInt({ message: 'The FTP port must be in numeric format.' })
  @IsNotEmpty({ message: 'The FTP port field must not be empty.' })
  public readonly ftpPort: number;

  @IsNotEmpty({ message: 'The games field must not be empty.' })
  public games: string;
}
