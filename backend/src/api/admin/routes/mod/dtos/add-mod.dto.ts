import {
  IsNotEmpty,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DOCKER_IMAGE_REGEX } from 'src/shared/utils/regex.constants';

export class AddModDto {
  @IsUUID('4', {
    message: 'The game ID is not valid.',
  })
  @IsNotEmpty({ message: 'The game ID field must not be empty.' })
  public readonly gameId: string;

  @MaxLength(40, {
    message: 'The mod name must contain a maximum of 40 characters.',
  })
  @MinLength(2, { message: 'The mod name must contain at least 2 characters.' })
  @IsNotEmpty({ message: 'The mod name field must not be empty.' })
  public readonly modName: string;

  @Matches(DOCKER_IMAGE_REGEX, {
    message:
      'Allowed characters for the Docker image are: a-z (lowercase only), 0-9, - (hyphen), and _ (underscore).',
  })
  @MaxLength(40, {
    message: 'The docker image must contain a maximum of 40 characters.',
  })
  @MinLength(2, {
    message: 'The docker image must contain at least 2 characters.',
  })
  @IsNotEmpty({ message: 'The docker image field must not be empty.' })
  public readonly dockerImage: string;

  @IsNotEmpty({ message: 'The startup variables field must not be empty.' })
  public readonly startupVariables: string;

  @IsNotEmpty({ message: 'The startup command field must not be empty.' })
  public readonly startupCommand: string;

  @MaxLength(2500, {
    message: 'The description must contain a maximum of 2500 characters.',
  })
  @MinLength(10, {
    message: 'The description must contain at least 10 characters.',
  })
  @IsNotEmpty({ message: 'The description field must not be empty.' })
  public readonly description: string;

  public dockerFile: string;
}
