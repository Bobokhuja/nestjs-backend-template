import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common'

@Injectable()
export class DateValidationPipe implements PipeTransform {
  transform(date: string, metadata: ArgumentMetadata) {
    try {
      if (!date) return undefined
      const jsonDate = new Date(date)
      return jsonDate.toISOString()
    } catch(e) {
      throw new BadRequestException()
    }
  }
}