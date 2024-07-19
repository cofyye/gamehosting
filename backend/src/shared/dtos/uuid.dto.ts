import { IsNotEmpty, IsUUID } from 'class-validator';

export class UuidDto {
  @IsUUID('4', {
    message: 'The ID is not valid.',
  })
  @IsNotEmpty({ message: 'The ID field must not be empty.' })
  public readonly id: string;
}
