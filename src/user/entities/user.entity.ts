import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'пользователя' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'Bobokhuja', description: 'Имя' })
  @Column({ nullable: false })
  name: string

  @ApiProperty({ example: 'bobokhuja', description: 'username' })
  @Column({ nullable: false, unique: true })
  username: string

  @ApiProperty({ example: '123456', description: 'пароль' })
  @Column({ nullable: false })
  password: string
}