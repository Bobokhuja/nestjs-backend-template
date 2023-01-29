import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common"

interface FileType {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: BufferSource
}

@Injectable()
export class ImagesValidationPipe implements PipeTransform {
  transform(images: {jpg?: FileType[], webp?: FileType[]}, metadata: ArgumentMetadata) {
    if (!images.jpg) {
      throw new BadRequestException('Поля "jpg" является объязательным')
    }
    const result: {jpg?: FileType, webp?: FileType} = {}
    const jpg = images.jpg[0]
    const webp = images.webp && images.webp[0]

    if (jpg.mimetype.search(/(image\/jpeg|image\/png)$/) === -1) {
      throw new BadRequestException('Формат файла в поле "jpg" должен быть "image/jpeg" или "image/png"')
    }

    if (webp?.mimetype.search(/(image\/webp)$/) === -1) {
      throw new BadRequestException('Формат файла в поле "webp" должен быть "image/webp"')
    }

    if (jpg) {
      result.jpg = jpg
    }
    if (webp) {
      result.webp = webp
    }

    return result
  }
}

@Injectable()
export class ImagesUpdateValidationPipe implements PipeTransform {
  transform(images: {jpg?: FileType[], webp?: FileType[]}, metadata: ArgumentMetadata) {
    const result: {jpg?: FileType, webp?: FileType} = {}
    const jpg = images?.jpg && images.jpg[0]
    const webp = images?.webp && images.webp[0]

    if (jpg?.mimetype.search(/(image\/jpeg|image\/png)$/) === -1) {
      throw new BadRequestException('Формат файла в поле "jpg" должен быть "image/jpeg" или "image/png"')
    }

    if (webp?.mimetype.search(/(image\/webp)$/) === -1) {
      throw new BadRequestException('Формат файла в поле "webp" должен быть "image/webp"')
    }

    if (jpg) {
      result.jpg = jpg
    }
    if (webp) {
      result.webp = webp
    }

    return result
  }
}