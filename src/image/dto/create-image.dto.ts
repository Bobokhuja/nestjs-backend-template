import {IsNotEmpty, IsOptional} from "class-validator"

export class CreateImageDto {
  @IsNotEmpty()
  jpg: any

  @IsOptional()
  webp?: any

  @IsOptional()
  width?: number

  @IsOptional()
  height?: number
}