import { IsNotEmpty, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdatePasswordDto {

  @ApiProperty({ example: '123456', description: 'Старый пароль' })
  @IsNotEmpty()
  old_password: string

  @ApiProperty({ example: '1234567', description: 'Новый пароль' })
  @Length(6, 36)
  @IsNotEmpty()
  new_password: string
}