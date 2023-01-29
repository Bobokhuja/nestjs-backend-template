import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common'

@Injectable()
export class ParseIntOptionalPipe implements PipeTransform {
  transform(number: any, metadata: ArgumentMetadata) {
    try {
      if (Number.isNaN(+number)) return undefined
      return +number
    } catch(e) {
      return undefined
    }
  }
}