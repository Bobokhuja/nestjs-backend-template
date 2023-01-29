import {IsNotEmpty, IsOptional} from "class-validator"

export class UpdateImageDto {
  @IsOptional()
  jpg: any

  @IsOptional()
  webp?: any

  @IsOptional()
  width?: number

  @IsOptional()
  height?: number
}