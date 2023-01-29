import { IsNotEmpty, Length } from 'class-validator'

export class UpdateUserDto {
  @IsNotEmpty()
  @Length(3, 32)
  name: string

  @Length(3, 12)
  @IsNotEmpty()
  username: string
}