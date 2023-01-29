import { IsNotEmpty, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'admin@sitabr.tj', description: 'Имя' })
  @IsNotEmpty()
  @Length(3, 32)
  name: string

  @ApiProperty({ example: 'admin', description: 'Логин' })
  @Length(3, 12)
  @IsNotEmpty()
  username: string

  @ApiProperty({ example: '123456', description: 'Пароль' })
  @Length(6, 36)
  @IsNotEmpty()
  password: string
}