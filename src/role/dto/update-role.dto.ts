import {IsNotEmpty, IsOptional, IsString} from 'class-validator'

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  value: string

  @IsOptional()
  @IsString()
  description?: string
}