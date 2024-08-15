import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { HostBy } from 'src/shared/enums/game.enum';

export class AddGameDto {
  @MaxLength(50, {
    message: 'The game must contain a maximum of 50 characters.',
  })
  @MinLength(2, { message: 'The game must contain at least 2 characters.' })
  @IsNotEmpty({ message: 'The game field must not be empty.' })
  public readonly name: string;

  @MaxLength(30, {
    message: 'The tag must contain a maximum of 30 characters.',
  })
  @MinLength(2, {
    message: 'The tag must contain at least 2 characters.',
  })
  @IsNotEmpty({ message: 'The tag field must not be empty.' })
  public readonly tag: string;

  @Max(65535, {
    message: 'The maximum value for the start port must be 65535.',
  })
  @Min(1, { message: 'The minimum value for the start port must be 1.' })
  @IsInt({ message: 'The start port must be in numeric format.' })
  @IsNotEmpty({ message: 'The start port field must not be empty.' })
  public readonly startPort: number;

  @Max(65535, {
    message: 'The maximum value for the end port must be 65535.',
  })
  @Min(1, { message: 'The minimum value for the end port must be 1.' })
  @IsInt({ message: 'The end port must be in numeric format.' })
  @IsNotEmpty({ message: 'The end port field must not be empty.' })
  public readonly endPort: number;

  @IsEnum(HostBy, { message: 'Host By must be: slot or custom_resources.' })
  @IsNotEmpty({ message: 'The host by field must not be empty.' })
  public readonly hostBy: HostBy;

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
